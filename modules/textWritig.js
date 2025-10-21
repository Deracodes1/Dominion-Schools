// text writing effect
const text = "Semper Suprene Nitens (Always striving upwards)           ";
let i = 0;

export function typeWriter() {
  setInterval(() => {
    if (i < text.length) {
      document.querySelector(".para").innerHTML += text.charAt(i);
      i++;
    }
    if (i === text.length) {
      document.querySelector(".para").innerHTML = "";
      i = 0;
    }
  }, 150);
}
