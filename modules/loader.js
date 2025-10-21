export const loaderContainer = document.querySelector(".container");
export const loader = document.querySelector(".loader");
const logoImg = document.querySelector(".logo-img");

export default function removeLoader() {
  if (document.readyState == "interactive") {
    setTimeout(() => {
      loader.style.opacity = 0;
    }, 4800);
    setTimeout(() => {
      loaderContainer.style.display = "none";
    }, 5500);
    setTimeout(() => {
      logoImg.classList.remove("logo-img-hide");
    }, 7500);
  }
}
