"use strict";

// ----- Coding Challenge 1 -----

// In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

// Here are your tasks:

// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
// 2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://www.bigdatacloud.com/reverse-geocoding/reverse-geocode-to-city-api.
// The AJAX call will be done to a URL with this format: https://api-bdc.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. Use the fetch API and promises to get the data.
// 3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
// 4. Chain a .catch method to the end of the promise chain and log errors to the console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
// 7. Render the country and catch any errors that have occured.

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474

// --- 1.1 ---
function whereAmI(lat, lng) {
  // --- 1.2 ---
  fetch(`https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
    .then(response => {
      // --- 1.5 ---
      if (!response.ok) throw new Error(`Error ${response.status}: Could not retrieve location!`);

      return response.json();
    })
    // --- 1.3 ---
    .then(data => {
      const country = data.countryName;
      console.log(`You are in ${data.city}, ${country}`);

      // --- 2.1 ---
      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    // --- 2.2 ---
    .then(response => {
      if (!response.ok) throw new Error(`Error ${response.status}: Country not found!`);
      return response.json();
    })
    .then(data => {
      const country = data[0];
      const container = document.querySelector(`.countries`);

      const html = `
      <article class="country">
        <img class="country__img" src="${country.flags.png}" />
        <div class="country__data">
          <h3 class="country__name">${country.name.common}</h3>
          <h4 class="country__region">${country.region}</h4>
          <p class="country__row"><span>👫</span>${(+country.population / 1000000).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${Object.values(country.languages)[0]}</p>
          <p class="country__row"><span>💰</span>${Object.values(country.currencies)[0].name}</p>
        </div>
      </article>
      `;
      container.insertAdjacentHTML("beforeend", html);
      container.style.opacity = 1;
    })
    // --- 1.4 ---
    .catch(err => console.error(err.message));
}

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
