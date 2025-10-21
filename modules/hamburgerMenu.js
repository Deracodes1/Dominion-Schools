const bar = document.querySelector(".mobile");
const icon = document.querySelector(".bar");
const nav = document.querySelector(".nav");
const resposnsiveBarFunc = function () {
  // opens the side bar at phone screen size
  if (icon.classList.contains("fa-bars")) {
    icon.classList.replace("fa-bars", "fa-xmark");
    nav.classList.add("active");
    bar.style.zIndex = "10000";
  } else {
    icon.classList.replace("fa-xmark", "fa-bars");
    nav.classList.remove("active");
  }
};

export default bar.addEventListener("click", resposnsiveBarFunc);
