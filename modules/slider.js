let slideIndex = 0;
export function showSlides() {
  let slides = document.getElementsByClassName("mySlides");

  // Hide all slides by default
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  // Change slide every 5 seconds
  setTimeout(showSlides, 5000);
}
