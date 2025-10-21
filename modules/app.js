// selecting needed elements
const animatedTextEl = document.querySelector(".animated-text");
const changingWordEl = document.querySelector("#changing-word");

// // class blueprint
export class App {
  words = [
    "possibilities",
    "opportunities",
    "adventures",
    "reformation",
    "innovation",
    "excellence",
    "confidence",
    "expertise",
  ];
  allLetterSpans;
  wordIndex = 0;
  letterIndex = 0;
  waveSpeed = 120;
  animationInterval;
  constructor() {
    this._wrapletters(animatedTextEl);
    // collect all span letters for animation
    this.allLetterSpans = animatedTextEl.querySelectorAll(
      ".animated-text span"
    );
    setInterval(this._changeWord.bind(this), 3000);
  }
  // wrapping all letters of the sentence in spans
  _wrapletters(el) {
    const nodes = Array.from(el.childNodes);
    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        // wrap each character of plain text
        node.textContent.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          el.insertBefore(span, node);
        });
        el.removeChild(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        this._wrapletters(node);
      }
    });
  }

  // animte faint waves across all letters
  _startWave() {
    if (this.animationInterval) clearInterval(this.animationInterval);

    this.animationInterval = setInterval(() => {
      this.allLetterSpans.forEach((l) =>
        l.classList.remove("faint", "faint-trail")
      );
      if (!this.allLetterSpans[this.letterIndex]) return;
      this.allLetterSpans[this.letterIndex].classList.add("faint");
      const prev =
        (this.letterIndex - 1 + this.allLetterSpans.length) %
        this.allLetterSpans.length;
      this.allLetterSpans[prev].classList.add("faint-trail");
      this.letterIndex = (this.letterIndex + 1) % this.allLetterSpans.length;
    }, this.waveSpeed);
  }

  // cahnge word only for spans inside changing word
  _changeWord() {
    // slow down wave during word swap
    this.waveSpeed = 200;
    this._startWave();

    changingWordEl.classList.add("fade");

    setTimeout(() => {
      // change to new word
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      const newWord = this.words[this.wordIndex];

      // remove old spans
      changingWordEl.innerHTML = "";

      // add new spans for the new world
      newWord.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        changingWordEl.appendChild(span);

        // refresh allLetterspans to include new spans
        this.allLetterSpans = animatedTextEl.querySelectorAll("span");

        // fade in changin word
        changingWordEl.classList.remove("fade");
      });

      // speed increased afer fade in
      setTimeout(() => {
        this.waveSpeed = 120;
        this._startWave();
      }, 500);
    }, 500);
  }
}
