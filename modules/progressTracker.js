// creating the progress bar tracker
const progressBar = document.createElement("div");
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.width = "0";
progressBar.style.height = "4px";
progressBar.style.backgroundColor = "#007bff";
progressBar.style.zIndex = "1000";
progressBar.style.transition = "all 0.5s ease";
document.body.appendChild(progressBar);

// listening for scroll event and setting the scroll bar width accordinly
export function trackProgressBar() {
  window.addEventListener("scroll", function () {
    const winHeight = window.window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrolled = (window.scrollY / (docHeight - winHeight)) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
}
