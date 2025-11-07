"use strict";

const adviceTextEl = document.getElementById("message-content");
const adviceTextElContainer = document.querySelector(".advice-message");
const refreshBtn = document.querySelector(".advice-btn");

refreshBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  // show the loader spinner
  adviceTextElContainer.innerHTML = '<div class="spinner"></div>';
});
