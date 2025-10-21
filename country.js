const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <h5 class="country__subregion">Sub-region: ${data.subregion}</h5>
              <p class="country__row"><span>Capital:</span>${data.capital}</p>
              <p class="country__row"><span>Regional Blocs:</span>${
                data.regionalBlocs[0].name
              } 
              (${data.regionalBlocs[0].acronym})</p>
              <p class="country__row"><span>Population:</span>${(
                +data.population / 1000000
              ).toFixed(1)} people</p>
              <p class="country__row"><span>Language:</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>Currency Name:</span>${
                data.currencies[0].name
              }</p>
              <p class="country__row"><span>Currency Symbol:</span>${
                data.currencies[0].symbol
              }</p>
              <p class="country__row"><span>Currency Code:</span>${
                data.currencies[0].code
              }</p>
              <p class="country__row"><span>Calling Code:</span>${
                data.callingCodes
              }</p>
              <p class="country__row"><span>Timezone:</span>${
                data.timezones[0]
              }</p>
            </div>
          </article>
  `;
  countriesContainer.insertAdjacentHTML("afterbegin", html);
  countriesContainer.style.opacity = 1;
};
// function to render error message
const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

// function to make api call and fetch country
const fetchCountry = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v2/name/${country}`);
    console.log(res);
    if (!res.ok) {
      throw new Error(`Country not found`);
    }
    const data = await res.json();
    console.log(data);

    renderCountry(data[0]);
  } catch (error) {
    renderError(error.message);
  }
};
const countryInputEl = document.querySelector(".search-input-country");
const searchEl = document.querySelector(".fa-search-country");
searchEl.addEventListener("click", function () {
  fetchCountry(countryInputEl.value);
});

// fetchCountry("portugal");
// fetchCountry("nigeria");
// fetchCountry("germany");
// fetchCountry("france");
// fetchCountry("scotland");
// fetchCountry("kuwait");
