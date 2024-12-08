// Selection all the different buttons
const themeToggleBtn = document.querySelector(".theme-toggle-btns");
const addNewNotebookBtn = document.querySelector(".add-new-notebook-btn");
const cancelAddNotebookBtn = document.querySelector(".cancle-add-notebook");
const addNewNoteBtn = document.querySelector(".add-new-note-btn");
const cancelNewNoteBtn = document.querySelector(".cancel-note-btn");

// Slections all the different containers
const notebooksContainer = document.querySelector(".notebooks-container");
const notebooks = document.querySelectorAll('.notebook')
const editNotebooksTitleBtns = document.querySelectorAll('.edit-notebook-title-btn')
const sun = document.querySelector(".dark-theme");
const moon = document.querySelector(".light-theme");
const greeting = document.querySelector(".greeting");
const currentDate = document.querySelector(".todays-date");

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

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let date = d.getDate() + ''
  let month = months[d.getMonth()].substring(0,3)
  let year = d.getFullYear()
  let hrs = d.getHours()
  const day = days[d.getDay()].substring(0,3)

  currentDate.innerHTML = `${day}, ${month} ${+date > 10 ? date : date.padStart(2 , "0")} ${year} `
  greeting.innerHTML = `Good ${hrs < 12 ? "Morning" : hrs < 16 ?"Evening" : hrs < 20 ? "Night" : "Evening"}`
  
};

setCurrentDate()


// Functionality of editing the title of the notebook

const editNotebookTitle = (notebook) =>{
  const titleDiv = notebook.querySelector('.notebook-title')
  titleDiv.contentEditable = "true" ;
  titleDiv.focus()

  titleDiv.addEventListener('blur', function() {
    titleDiv.contentEditable = "false";
  });
}

editNotebooksTitleBtns.forEach((editBtns , index) => {

editBtns.addEventListener('click',()=>{
  editNotebookTitle(notebooks[index])
})

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
