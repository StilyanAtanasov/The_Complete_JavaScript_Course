"use strict";

class App {
  #map;
  #currentWorkoutBuilder;

  constructor() {
    this.#getPosition();
    this.workouts = [];

    elements.inputs.type.addEventListener(`change`, this.#changeFormType);
  }

  #getPosition = () =>
    navigator.geolocation.getCurrentPosition(
      this.#displayMap.bind(this),
      () => console.error(`Error: Cound not get your position!`) // TODO
    );

  #displayMap(position) {
    const { latitude, longitude } = position.coords;

    this.#map = L.map(`map`).setView([latitude, longitude], 14);

    L.tileLayer(`https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
    }).addTo(this.#map);

    this.#map.on(`click`, this.#renderForm.bind(this));
  }

  #renderForm(e) {
    const { lat, lng } = e.latlng;

    this.#toggleForm();

    this.#currentWorkoutBuilder = () => this.#createWorkout(lat, lng);
    elements.containers.form.addEventListener(`submit`, this.#currentWorkoutBuilder);
  }

  #toggleForm = () => elements.containers.form.classList.toggle(`hidden`);
  #clearFields = (...fieldNames) => fieldNames.forEach(f => (elements.inputs[f].value = ``));

  #createWorkout(lat, lng) {
    const type = elements.inputs.type.value;
    const distance = elements.inputs.distance.value;
    const duration = elements.inputs.duration.value;
    const dateNow = new Date();

    let workout;
    if (type === `running`) {
      const cadence = elements.inputs.cadence.value;
      if (!this.#validateFormArguments(distance, duration, cadence)) return console.error(`Invalid input`); // TODO

      workout = new Running(distance, duration, cadence, [lat, lng], dateNow);
    } else {
      const elevation = elements.inputs.elevation.value;
      console.log(distance, duration, elevation);
      if (!this.#validateFormArguments(distance, duration, elevation)) return console.error(`Invalid input`); // TODO

      workout = new Cycling(distance, duration, elevation, [lat, lng], dateNow);
    }

    // TODO external method
    const workoutEl = `<li class="workout workout--${type}" data-id="1234567890">
          <h2 class="workout__title">${type}</h2>
          <div class="workout__details">
            <span class="workout__icon">🏃‍♂️</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;

    elements.containers.form.insertAdjacentHTML(`afterend`, workoutEl);
    this.workouts.push(workout);

    this.#displayMarker(lat, lng);
    this.#toggleForm();
    this.#clearFields(`distance`, `duration`, `elevation`, `cadence`);
    elements.containers.form.removeEventListener(`submit`, this.#currentWorkoutBuilder);
  }

  #displayMarker = (lat, lng) => L.marker([lat, lng]).addTo(this.#map);

  #validateFormArguments = (...values) => values.every(v => !Number.isNaN(v) && v > 0);

  #changeFormType() {
    elements.inputs.cadence.closest(`.form__row`).classList.toggle(`form__row--hidden`);
    elements.inputs.elevation.closest(`.form__row`).classList.toggle(`form__row--hidden`);
  }
}

new App();
