const themeToggleBtn = document.querySelector(".theme-toggle-btns");

// Function to change the theme

const themeChange = () => {
  if (document.body.className == "dark") {
    document.body.classList.remove("dark");
  } else {
    document.body.classList.add("dark");
  }
};

themeToggleBtn.addEventListener("click", themeChange);
