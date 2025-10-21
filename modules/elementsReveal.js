export const rightSections = document.querySelectorAll(".right-section");
export const LeftSections = document.querySelectorAll(".left-section");

// function to hide all sections initially
export function hideSections() {
  rightSections.forEach((section) => {
    section.classList.add("section--hidden");
  });
  LeftSections.forEach((section) => {
    section.classList.add("section--hidden");
  });
}
export function leftReveal() {
  setTimeout(() => {
    LeftSections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }, 500);
}
export function rightReveal() {
  rightSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
// observing the sections and rvealing them on scroll
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
});
