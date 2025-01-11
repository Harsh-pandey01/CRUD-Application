// Selection all the different buttons
const themeToggleBtn = document.querySelector(".theme-toggle-btns");
const addNewNotebookBtn = document.querySelector(".add-new-notebook-btn");
const cancelAddNotebookBtn = document.querySelector(".cancle-add-notebook");
const addNotebookBtn = document.querySelector(".add-notebook");
const addNewNoteBtn = document.querySelector(".add-new-note-btn");
const cancelNewNoteBtn = document.querySelector(".cancel-note-btn");
const saveNewNoteBtn = document.querySelector(".save-note-btn");
const firstNotebookBtn = document.querySelector(".first-notebook-btn");
const firstNoteBtn = document.querySelector('.first-note-btn')
// Slections all the different containers
const notebooksContainer = document.querySelector(".notebooks-container");
const allNotebooks = document.querySelectorAll(".notebook");
const notesWrapper = document.querySelector(".notes-wrapper");
const newNotebookTitleInput = document.querySelector("#notebook-title-input");
const sun = document.querySelector(".dark-theme");
const moon = document.querySelector(".light-theme");
const greeting = document.querySelector(".greeting");
const currentDate = document.querySelector(".todays-date");
const newNoteTitleInput = document.querySelector("#new-notes-title-input");
const newNoteForm = document.querySelector("#newNoteForm");
const selectedNotebookTitle = document.querySelector(
  ".selected-notebook-title"
);
const appRightWrapper = document.querySelector(".app-right-section");
const noNotesPresentWrapper = document.querySelector('.no-Notes-present-message-wrapper')
// Data Regarding the notebooks and the books present in the notes

let notebooksData = [];
let activeNotebookId;
let theme = localStorage.getItem('theme') || 'light' 

if(theme == 'dark'){
  document.body.classList.add("dark");
    moon.classList.add("active");
    sun.classList.remove("active");
}

// Function to change the theme

const themeChange = () => {
  if (document.body.className == "dark") {
    document.body.classList.remove("dark");
    sun.classList.add("active");
    moon.classList.remove("active");
    localStorage.setItem('theme','light')
  } else {
    document.body.classList.add("dark");
    moon.classList.add("active");
    sun.classList.remove("active");
    localStorage.setItem('theme','dark')
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
    hrs < 12
      ? "Morning"
      : hrs < 16
      ? "Afternoon"
      : hrs < 20
      ? "Evening"
      : "Night"
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
  if (notebooksData.length > 0) {
    appRightWrapper.classList.add("notebook-present");
  } else {
    appRightWrapper.classList.remove("notebook-present");
    noNotesPresentWrapper.classList.remove('active')
  }
  notebooksData.forEach((notebook) => {
    let newNotebook = document.createElement("div");
    newNotebook.classList.add("notebook");
    if (notebook.isActive) {
      newNotebook.classList.add("active");
      activeNotebookId = notebook.id;
      selectedNotebookTitle.innerHTML = notebook.title;
      // Function to list all the notes of the active notebook
      handleListingAllNotes(notebook);
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
      .addEventListener("click", (e) => {
        e.stopPropagation();
        editNotebookTitle(newNotebook);
      });

    // Functionality of deleting a notebook

    newNotebook
      .querySelector(".delete-notebook-btn")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        deleteNotebook(notebook.id);
      });

    // Event Listener for the notebook when it is clicked and active

    newNotebook.addEventListener("click", (e) => {

      notebooksData.forEach((data) => {
        if (data.id == notebook.id) {
          data.isActive = true;
          activeNotebookId = notebook.id;
        } else {
          data.isActive = false;
        }
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

  titleDiv.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  titleDiv.addEventListener("blur", function () {
    titleDiv.contentEditable = "false";
  });
}

function deleteNotebook(notebookId) {
  let newData = notebooksData.filter((elem) => {
    return elem.id != notebookId;
  });

  if (activeNotebookId == notebookId) {
    if (newData.length > 0) {
      newData[0].isActive = true;
      activeNotebookId = newData[0].id;
    } else {
      activeNotebookId = "";
    }
  }

  localStorage.setItem("notebooksData", JSON.stringify(newData));
  fetchNotebooksDataFromLS();
}

// Functionality to add new notebook by user when title is being providied

const createNewNotebook = (notebookTitle) => {
  // Create a notebook data and update it in the localStorage and again call a function to fetch all
  // notebook to get the updated notebooks

  notebooksData.forEach((data) => {
    data.isActive = false;
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

// first notebook btn

firstNotebookBtn.addEventListener("click", () => {
  addNewNotebookBtn.click();
});


// --------------------------------- Notes Section

// adding first Note Btn
firstNoteBtn.addEventListener('click',()=>{
  addNewNoteBtn.click()
})


//  To prevent the default submit behaviour of the form
newNoteForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

function handleAddNewNote() {
  const formData = new FormData(newNoteForm);

  const newNote = {};

  for (const [key, value] of formData) {
    if (value) {
      newNote[key] = value;
      newNote.id = crypto.randomUUID();
    } else {
      alert("fill all the inputs");
      return;
    }
  }
  newNoteForm.reset();
  // get the notebook and also push the new note to the noteBook
  notebooksData.forEach((data) => {
    if (data.id == activeNotebookId) {
      data.notes.push(newNote);
    }
  });

  localStorage.setItem("notebooksData", JSON.stringify(notebooksData));
  fetchNotebooksDataFromLS();

  cancelNewNoteBtn.click();
}

saveNewNoteBtn.addEventListener("click", handleAddNewNote);

// Function to list all the notebook of the active notebook

function handleListingAllNotes(activeNotebook) {
  notesWrapper.innerHTML = "";

  
  if (activeNotebook.notes.length > 0) {
    noNotesPresentWrapper.classList.remove('active')
    activeNotebook.notes.forEach((note) => {
      

      const noteElement = document.createElement("div");
      noteElement.classList.add("note");
      noteElement.innerHTML = `
      <div class="note-title">
                        ${note["note-title"]}
                    </div>
                    <div class="note-content">
                        ${note["note-content"]}
                    </div>
                    <div class="note-update-date">
                        5 days ago
                    </div>
                    <button class="delete-note-btn">
                        <i class="ri-delete-bin-line"></i>
                    </button>
      `;

      // event listener to delete a note from the noteList

      noteElement
        .querySelector(".delete-note-btn")
        .addEventListener("click", () => {
          handleDeleteANote(note.id, activeNotebook);
        });

      notesWrapper.append(noteElement);
    });
  }else{
     noNotesPresentWrapper.classList.add('active')
  }
}

// Function to handle the delete note from notes wrapper

function handleDeleteANote(noteId, currentNotebook) {
  const updatedNotesList = currentNotebook.notes.filter((note) => {
    return note.id != noteId;
  });

  currentNotebook.notes = updatedNotesList;

  localStorage.setItem("notebooksData", JSON.stringify(notebooksData));
  fetchNotebooksDataFromLS();
}

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
