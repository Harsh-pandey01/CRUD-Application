// Selection all the different buttons
const themeToggleBtn = document.querySelector(".theme-toggle-btns");
const addNewNotebookBtn = document.querySelector(".add-new-notebook-btn");
const cancelAddNotebookBtn = document.querySelector(".cancle-add-notebook");
const addNotebookBtn = document.querySelector(".add-notebook");
const addNewNoteBtn = document.querySelector(".add-new-note-btn");
const cancelNewNoteBtn = document.querySelector(".cancel-note-btn");

// Slections all the different containers
const notebooksContainer = document.querySelector(".notebooks-container");
const allNotebooks = document.querySelectorAll(".notebook");

const newNotebookTitleInput = document.querySelector("#notebook-title-input");
const sun = document.querySelector(".dark-theme");
const moon = document.querySelector(".light-theme");
const greeting = document.querySelector(".greeting");
const currentDate = document.querySelector(".todays-date");

// Data Regarding the notebooks and the books present in the notes

let notebooksData = [];

// Function to change the theme

const themeChange = () => {
  if (document.body.className == "dark") {
    document.body.classList.remove("dark");
    sun.classList.add("active");
    moon.classList.remove("active");
  } else {
    document.body.classList.add("dark");
    moon.classList.add("active");
    sun.classList.remove("active");
  }
};
themeToggleBtn.addEventListener("click", themeChange);

// function to set the current date and greeting

const setCurrentDate = () => {
  let d = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = d.getDate() + "";
  let month = months[d.getMonth()].substring(0, 3);
  let year = d.getFullYear();
  let hrs = d.getHours();
  const day = days[d.getDay()].substring(0, 3);

  currentDate.innerHTML = `${day}, ${month} ${
    +date > 10 ? date : date.padStart(2, "0")
  } ${year} `;
  greeting.innerHTML = `Good ${
    hrs < 12 ? "Morning" : hrs < 16 ? "Evening" : hrs < 20 ? "Night" : "Evening"
  }`;
};

setCurrentDate();

// function to fetch the data from the local storage and set the data

const fetchNotebooksDataFromLS = () => {
  const localStorageData = localStorage.getItem("notebooksData");

  if (localStorageData) {
    notebooksData = JSON.parse(localStorageData);
    handleNotebooksLoad();
  }
};

fetchNotebooksDataFromLS();

// Function to fetch and load all the notebooks of the person

function handleNotebooksLoad() {
  // loading each and every notebooks based on the notebooks data
  notebooksContainer.innerHTML = "";
  notebooksData.forEach((notebook) => {
    let newNotebook = document.createElement("div");
    newNotebook.classList.add("notebook");
    if (notebook.isActive) {
      newNotebook.classList.add("active");
    }

    newNotebook.innerHTML = `
  <p class="notebook-title" id=${notebook.id}>${notebook.title}</p>
                        <div class="notebook-btns-wrapper">
                            <button class="edit-notebook-title-btn">
                                <i class="ri-pencil-line"></i>
                            </button>
                            <button class="delete-notebook-btn">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        </div>
  `;
    notebooksContainer.append(newNotebook);

    // Functionality of editing the title of the container

    newNotebook
      .querySelector(".edit-notebook-title-btn")
      .addEventListener("click", () => {
        editNotebookTitle(newNotebook);
      });

    // Functionality of deleting a notebook

    newNotebook
      .querySelector(".delete-notebook-btn")
      .addEventListener("click", (e) => {
        deleteNotebook(notebook.id);
      });

    // Event Listener for the notebook when it is clicked and active

    newNotebook.addEventListener("click", (e) => {
      notebooksData.forEach((data) => {
        data.isActive = data.id == notebook.id ? true : false;
      });

      localStorage.setItem("notebooksData", JSON.stringify(notebooksData));
      fetchNotebooksDataFromLS();
    });
  });
}

// Function of editing the title of the notebook

function editNotebookTitle(notebook) {
  const titleDiv = notebook.querySelector(".notebook-title");
  titleDiv.contentEditable = "true";
  titleDiv.focus();

  titleDiv.addEventListener("blur", function () {
    titleDiv.contentEditable = "false";
  });
}

function deleteNotebook(notebookId) {
  let newData = notebooksData.filter((elem) => {
    return elem.id != notebookId;
  });

  localStorage.setItem("notebooksData", JSON.stringify(newData));
  fetchNotebooksDataFromLS();
}

// Functionality to add new notebook by user when title is being providied

const createNewNotebook = (notebookTitle) => {
  // Create a notebook data and update it in the localStorage and again call a function to fetch all
  // notebook to get the updated notebooks

  notebooksData.forEach((data) => {
     data.isActive =  false;
  });


  const newNotebookData = {
    id: crypto.randomUUID(),
    title: notebookTitle,
    isActive: true,
    notes: [],
  };

  notebooksData.push(newNotebookData);
  localStorage.setItem("notebooksData", JSON.stringify(notebooksData));
  fetchNotebooksDataFromLS();
};

addNotebookBtn.addEventListener("click", () => {
  // Check if the input is provided by user or not
  // if provided create a new notebook else ask them to enter notebook's title and continue

  let inputProvided = newNotebookTitleInput.value;

  if (inputProvided) {
    createNewNotebook(inputProvided);
    cancelAddNotebookBtn.click();
  }
});

// --------------------------------------- Gsap Animations

let notebookOverlayTimeline = gsap.timeline();

notebookOverlayTimeline.to("#add-new-notebook-overlay", {
  display: "flex",
  scale: 1,
  opacity: 1,
  duration: 0.3,
});

notebookOverlayTimeline.pause();

addNewNotebookBtn.addEventListener("click", () => {
  notebookOverlayTimeline.play();
});

cancelAddNotebookBtn.addEventListener("click", () => {
  notebookOverlayTimeline.reverse();
});

let noteOverlayTimeline = gsap.timeline();

noteOverlayTimeline.to("#add-new-note-overlay", {
  display: "flex",
  scale: 1,
  opacity: 1,
  duration: 0.3,
});

noteOverlayTimeline.pause();

addNewNoteBtn.addEventListener("click", () => {
  noteOverlayTimeline.play();
});

cancelNewNoteBtn.addEventListener("click", () => {
  noteOverlayTimeline.reverse();
});
