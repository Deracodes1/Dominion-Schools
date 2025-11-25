const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const refreshFactBtn = document.getElementById("refreshfact-btn");
const countryInfo = document.getElementById("country-info");

// selecting country details elements
const FlagEl = document.getElementById("country-flag");
const nameEl = document.getElementById("country-name");
const capitalEl = document.getElementById("capital");
const regonEl = document.getElementById("region");
const subregonEl = document.getElementById("subregion");
const populationEl = document.getElementById("population");
const languageEl = document.getElementById("languages");
const currencyNameEl = document.getElementById("currency-name");
const currencySymbolEl = document.getElementById("currency-symbol");
const currencyCodeEl = document.getElementById("currency-code");
const callingCodeEl = document.getElementById("calling-Code");
const timzoneEl = document.getElementById("timezone");
const regionalBlocsEl = document.getElementById("regional-blocs");
const neighborsEl = document.getElementById("neighbors");
const leaderSection = document.querySelector(".leader-section");
const leaderImg = document.getElementById("leader-img");
const leaderTitle = document.getElementById("leader-title");
const leaderName = document.getElementById("leader-name");
const factEl = document.getElementById("fun-fact");

// once the page loads. get the user's location and display the country's data
(async function () {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) {
      throw new Error(`trouble getting your current location`);
    }
    const data = await res.json();
    const country = data.country_name;

    await fetchCountry(country);
  } catch (error) {
    renderError(
      `Couldn't get your current country. please check your internet connection and can try searching any country of your choice`,
      404
    );
  }
})();

// function to get country's leader data
async function getLeaderInfo(countryName) {
  try {
    const response = await fetch("leaders.json");
    const leadersData = await response.json();
    return leadersData[countryName] || null;
  } catch (error) {
    return null;
  }
}
// function to format the country population
function formatPopulation(number) {
  if (number >= 1_000_000_000) {
    return `${(number / 1_000_000_000).toFixed(2)} billion people`;
  } else if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(2)} million people`;
  } else if (number >= 1_000) {
    return `${(number / 1_000).toFixed(2)} thousand people`;
  } else {
    return `${number} people`;
  }
}
// function to generate Avatar
function generateAvatar(name, options = {}) {
  const words = name.trim().split(/\s+/);

  // extract first and last name initials
  let initials;
  if (words.length === 1) {
    initials = words[0].charAt(0).toUpperCase();
  } else {
    initials =
      words[0].charAt(0).toUpperCase() +
      words[words.length - 1].charAt(0).toUpperCase();
  }

  // default options
  const {
    size = 200,
    background = "random",
    color = "fff",
    bold = "false",
    rounded = "false",
  } = options;

  // building the query params
  const params = new URLSearchParams({
    name: initials,
    size: size.toString(),
    color: color,
    bold: bold.toString(),
    rounded: rounded.toString(),
  });
  if (background) {
    params.append("background", background);
  }
  // returning the complete url
  return `https://ui-avatars.com/api/?${params.toString()}`;
}
// function to fetch country data
async function fetchCountry(name) {
  const errorHtml = document.querySelector(".error")?.remove();
  countryInfo.classList.add("hidden");
  const spinnerHtml = document.querySelector(".spinner")?.remove();

  const loadSpinner = '<div class="spinner"></div>';

  document.querySelector("main").insertAdjacentHTML("beforeend", loadSpinner);
  let responseStatus;
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    responseStatus = res.status;
    if (!res.ok) {
      throw new Error("Country not found");
    }
    const data = await res.json();
    setTimeout(() => {
      const spinnerHtml = document.querySelector(".spinner")?.remove();
      renderCountry(data[0]);
    }, 1000);
  } catch (error) {
    const spinnerHtml = document.querySelector(".spinner")?.remove();
    renderError(
      `${error.message}. Try
    searching again.`,
      responseStatus
    );
  }
}
// function to fetch random fact about country
async function getCountryFact(countryName) {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${countryName}`
    );
    if (!res.ok) {
      throw new Error(`No Fact found about ${countryName}`);
    }
    const data = await res.json();

    // extract a short interesting fact
    const sentences = data.extract.split(". ");
    const randomSentence =
      sentences[Math.floor(Math.random() * sentences.length)];
    return randomSentence + ".";
  } catch (error) {
    return `Could'nt find a fun fact right now - try another country`;
  }
}

// function to render error message
const renderError = function (msg, status = "") {
  countryInfo.classList.add("hidden");
  const errorHTML = `<p class="error" style="color:red; text-align:center; font-weight:600;">${status}: ${msg}.</P>`;
  document.querySelector("main").insertAdjacentHTML("beforeend", errorHTML);
};

// function to render data to UI
function renderCountry(country) {
  countryInfo.classList.remove("hidden");

  // filling in the basic info about the country
  FlagEl.src = country.flags?.svg || "";
  nameEl.textContent = country.name?.common || "N/A";
  capitalEl.textContent = country.capital ? country.capital[0] : "N/A";
  regonEl.textContent = country.region || "N/A";
  subregonEl.textContent = country.subregion || "N/A";

  // formatting the country's population
  populationEl.textContent = formatPopulation(country.population) || "N/A";

  // formatting the country's languages
  languageEl.innerHTML = "";
  const officaillLanguages = Object.values(country.languages);
  officaillLanguages.forEach((lang) => {
    const span = document.createElement("span");
    span.textContent = lang;
    languageEl.appendChild(span);
  });

  // formatting the country's currency
  const currencies = country.currencies
    ? Object.values(country.currencies)[0]
    : null;
  currencyNameEl.textContent = currencies?.name || "N/A";
  currencySymbolEl.textContent = currencies?.symbol || "N/A";
  currencyCodeEl.textContent =
    Object.keys(country.currencies || {})[0] || "N/A";

  // formatting the country's connectivity
  const root = country.idd?.root || "";
  const suffix = country.idd?.suffixes ? country.idd.suffixes[0] : "";
  callingCodeEl.textContent = root + suffix || "N/A";
  timzoneEl.textContent = country.timezones ? country.timezones[0] : "N/A";

  // formatting the country's Regional Blocs
  if (country.regionalBlocs && country.regionalBlocs.length > 0) {
    regionalBlocsEl.textContent = country.regionalBlocs
      .map((blocs) => blocs.name)
      .join(", ");
  } else {
    regionalBlocsEl.textContent = "N/A";
  }

  //  formatting the country's neighbors
  if (country.borders && country.borders.length > 0) {
    neighborsEl.innerHTML = "";
    const borders = country.borders.join(",");
    (async () => {
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${borders}`
        );
        const neighbors = await res.json();
        neighbors.forEach((neighbor) => {
          const span = document.createElement("span");
          const neighborFlagEl = document.createElement("img");
          neighborFlagEl.src = neighbor.flags?.svg;
          neighborFlagEl.classList.add("neighbor-flag");
          span.style.display = "flex";
          span.style.alignItems = "center";
          span.style.gap = "4px";
          span.style.justifyContent = "center";
          span.textContent = neighbor.name.common;
          span.classList.add("neighbor");
          span.addEventListener("click", (e) => {
            searchInput.value = e.target.textContent;
            fetchCountry(neighbor.name.common);
          });
          neighborsEl.appendChild(span);
          span.appendChild(neighborFlagEl);
        });
      } catch (error) {
        neighborsEl.innerHTML = "<span>unable to load neighbors</span>";
      }
    })();
  } else {
    neighborsEl.innerHTML = "<span>None</span>";
  }
  // fetching and formatting the country's leader info
  (async () => {
    const leaderInfo = await getLeaderInfo(country.name.common);
    if (leaderInfo) {
      leaderTitle.textContent = leaderInfo.title;
      leaderName.textContent = leaderInfo.name;
      leaderImg.src = generateAvatar(leaderInfo.name);
    } else {
      leaderTitle.textContent = "";
      leaderName.textContent = "could not find anything";
    }
  })();

  // fetching and formatting a fun fact about the country
  (async () => {
    const fact = await getCountryFact(country.name.common);
    factEl.textContent = fact;
  })();

  // smooth animation effect each time a new country is displayed
  countryInfo.classList.remove("fade-in");
  void countryInfo.offsetWidth;
  countryInfo.classList.add("fade-in");
}

// event listeners
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return;
  fetchCountry(query);
});
searchBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

refreshFactBtn.addEventListener("click", () => {
  (async () => {
    factEl.textContent = `Fetching fact about ${searchInput.value}...`;
    const fact = await getCountryFact(searchInput.value);
    factEl.classList.add("fade-in-text");
    setTimeout(() => {
      factEl.textContent = fact;
      factEl.classList.remove("fade-in-text");
    }, 1000);
  })();
});
