"use strict";
const adviceTextEl = document.querySelector(".advice-message");
const refreshBtn = document.querySelector(".advice-btn");

refreshBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  // show the loader spinner
  adviceTextEl.textContent = "";
  adviceTextEl.innerHTML = '<div class="spinner"></div>';
  try {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    if (!res.ok) {
      throw new Error("failed to get advice. check network connection");
    }
    // display the new advice after some seconds
    setTimeout(() => {
      adviceTextEl.textContent = `"${data.slip.advice}"`;
    }, 300);
  } catch (error) {
    setTimeout(() => {
      adviceTextEl.textContent = `${error.message} advice. Try again!`;
    }, 500);
  }
});
