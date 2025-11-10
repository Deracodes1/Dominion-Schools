const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
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
const factEl = document.getElementById("fun-fact");

// function to fetch country data
async function fetchCountry(name) {
  const errorHtml = document.querySelector(".error")?.remove();
  countryInfo.classList.add("hidden");
  const loadSpinner = '<div class="spinner"></div>';

  document.querySelector("main").insertAdjacentHTML("beforeend", loadSpinner);
  let responseStatus;
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    console.log(res);
    responseStatus = res.status;
    if (!res.ok) {
      throw new Error("Country not found");
    }
    const data = await res.json();
    setTimeout(() => {
      const spinnerHtml = document.querySelector(".spinner")?.remove();
      renderCountry(data[0]);
      console.log(data[0]);
    }, 500);
  } catch (error) {
    const spinnerHtml = document.querySelector(".spinner")?.remove();
    renderError(error.message, responseStatus);
  }
}
// function to fetch random fact about country

// render data to UI
function renderCountry(country) {
  countryInfo.classList.remove("hidden");

  // filling in the basic info about the country
  FlagEl.src = country.flags?.svg || "";
  nameEl.textContent = country.name?.common || "N/A";
  capitalEl.textContent = country.capital ? country.capital[0] : "N/A";
  regonEl.textContent = country.region || "N/A";
  subregonEl.textContent = country.subregion || "N/A";

  // formatting the country's population
  populationEl.textContent = country.population?.toLocaleString() || "N/A";

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
          span.textContent = neighbor.name.common;
          span.classList.add("neighbor");
          span.addEventListener("click", (e) => {
            searchInput.value = e.target.textContent;
            fetchCountry(neighbor.name.common);
          });
          neighborsEl.appendChild(span);
        });
      } catch (error) {
        neighborsEl.innerHTML = "<span>unable to load neighbors</span>";
      }
    })();
  } else {
    neighborsEl.innerHTML = "<span>None</span>";
  }
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

// function to render error message
const renderError = function (msg, status = "") {
  countryInfo.classList.add("hidden");
  const errorHTML = `<p class="error" style="color:red; text-align:center; font-weight:600;">${status}: ${msg}. Try
    searching again.</P>`;
  document.querySelector("main").insertAdjacentHTML("beforeend", errorHTML);
};
