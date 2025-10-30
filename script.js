// importing necessary modules
import responsiveNavbar from "./modules/hamburgerMenu.js";
import removeLoader from "./modules/loader.js";
import { loader, loaderContainer } from "./modules/loader.js";
import {
  hideSections,
  rightReveal,
  leftReveal,
} from "./modules/elementsReveal.js";
import { App } from "./modules/app.js";
import { trackProgressBar } from "./modules/progressTracker.js";
import { typeWriter } from "./modules/textWritig.js";
import { showSlides } from "./modules/slider.js";
import { activeNav } from "./modules/navlinks.js";
import { animatedCount } from "./modules/animtedCounter.js";
removeLoader(); //remove loader
hideSections(); // hide all sections initially
const app = new App(); // class instantiation
leftReveal(); // reveal sections on the left hand side immediately when intersected with viewport
rightReveal(); // reveal sections on the right hand side immediately when intersected with viewport
animatedCount();
trackProgressBar();
typeWriter();
activeNav();
showSlides(); // Initialize slideshow
// const programmingLanguages = document.getElementById("programming-languages");
// const frameWorkEl = document.getElementById("framework");
// console.log(programmingLanguages, frameWorkEl);
// function recommendFrameWork(language) {
//   if (language.toLowerCase() === "javascript") {
//     return "React";
//   }
//   if (language.toLowerCase() === "python") {
//     return "Django";
//   }
//   if (language.toLowerCase() === "php") {
//     return "Laravel";
//   }
//   if (language.toLowerCase() === "java") {
//     return "Spring Boot";
//   }
//   if (language.toLowerCase() === "dart") {
//     return "Flutter";
//   } else {
//     return "learn html";
//   }
// }
// programmingLanguages.addEventListener("change ", function () {
//   console.log(programmingLanguages.value);
//   frameWorkEl.textContent = `The Recommended FrameWork for ${
//     programmingLanguages.value
//   } is ${recommendFrameWork(programmingLanguages.value)}`;
// });
// const searchInput = document.querySelector(".search-input");

// searchInput.addEventListener("input", function () {
//   console.log(searchInput.value);
//   const allDivs = document.querySelectorAll("main div");
//   allDivs.forEach((div) => {
//     // div.style.display = "flex";
//     loader.style.opacity = 1;
//     loaderContainer.style.display = "block";
//     if (!div.classList.contains(searchInput.value)) {
//       console.log(div);
//       div.style.display = "none";
//     }
//     setTimeout(() => {
//       loader.style.opacity = 0;
//       loaderContainer.style.display = "none";
//       searchInput.blur();
//     }, 1000);
//   });
// });
