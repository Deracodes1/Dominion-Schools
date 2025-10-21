export function activeNav() {
  let currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".linke");
  navLinks.forEach((link) => {
    // remove old classes
    link.classList.remove("active");
    // add active classe to the current page
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}
