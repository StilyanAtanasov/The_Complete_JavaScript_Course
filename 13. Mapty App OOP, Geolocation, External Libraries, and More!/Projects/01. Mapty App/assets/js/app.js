"use strict";

class App {
  #map;
  #currentWorkoutBuilder;
  #MapZoom = 14;
  #workoutText = {
    running: {
      input1Icon: `🏃‍♂️`,
      input3Unit: `km/min`,
      input3Prop: `pace`,
      input4Icon: `🦶`,
      input4Prop: `cadence`,
      input4Unit: `spm`,
    },
    cycling: {
      input1Icon: `🚴‍♂️`,
      input3Unit: `km/h`,
      input3Prop: `speed`,
      input4Icon: `⛰️`,
      input4Prop: `elevation`,
      input4Unit: `m`,
    },
  };

  constructor() {
    this.workouts = [];
    this.#getPosition();
    this.#getStoredWorkouts();
    this.#displayStoredWorkouts();

    elements.inputs.type.addEventListener(`change`, this.#changeFormType);
    elements.containers.form.addEventListener(`submit`, e => e.preventDefault());
    elements.containers.workouts.addEventListener(`click`, this.#handleWorkoutClick.bind(this));
  }

  #getPosition = () =>
    navigator.geolocation.getCurrentPosition(
      this.#displayMap.bind(this),
      this.#getPosition // TODO
    );

  #displayMap(position) {
    const { latitude, longitude } = position.coords;

    this.#map = L.map(`map`).setView([latitude, longitude], this.#MapZoom);

    L.tileLayer(`https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
    }).addTo(this.#map);

    this.workouts.forEach(w => this.#displayMarker(w));

    this.#map.on(`click`, this.#renderForm.bind(this));
  }

  #renderForm(e) {
    this.#currentWorkoutBuilder && elements.containers.form.removeEventListener(`submit`, this.#currentWorkoutBuilder);

    this.#openForm();
    elements.inputs.distance.focus();

    this.#currentWorkoutBuilder = () => this.#createWorkout(e.latlng);
    elements.buttons.calcelForm.addEventListener(`click`, this.#closeForm); // FIX
    elements.containers.form.addEventListener(`submit`, this.#currentWorkoutBuilder);
  }

  #openForm = () => elements.containers.form.classList.remove(`hidden`);

  #closeForm = () => elements.containers.form.classList.add(`hidden`);

  #clearFields = (...fieldNames) => fieldNames.forEach(f => (elements.inputs[f].value = ``));

  #handleWorkoutClick(e) {
    const clicked = e.target;
    const workoutEl = clicked.closest(`.workout`);

    if (!workoutEl) return;

    const workout = this.workouts.find(w => w.id === workoutEl.dataset.id);
    if (clicked.closest(`.workout__tool`)?.classList.contains(`tool--delete`)) return this.#deleteWorkout(workout, workoutEl);

    this.#scrollToMarker(workout);
  }

  #createWorkout(latlng) {
    const type = elements.inputs.type.value;
    const distance = elements.inputs.distance.value;
    const duration = elements.inputs.duration.value;
    const dateNow = new Date();

    let workout;
    const { lat, lng } = latlng;
    if (type === `running`) {
      const cadence = elements.inputs.cadence.value;
      if (!this.#validateFormArguments(distance, duration, cadence)) return console.error(`Invalid input`); // TODO

      workout = new Running(distance, duration, cadence, [lat, lng], dateNow);
    } else {
      const elevation = elements.inputs.elevation.value;
      if (!this.#validateFormArguments(distance, duration, elevation)) return console.error(`Invalid input`); // TODO

      workout = new Cycling(distance, duration, elevation, [lat, lng], dateNow);
    }

    const workoutType = workout.type;
    const workoutTitle = workout.description;

    this.workouts.push(workout);
    this.#displayWorkout(workout, workoutTitle, workoutType);

    this.#displayMarker(workout, workoutTitle, workoutType);
    this.#closeForm();
    this.#clearFields(`distance`, `duration`, `elevation`, `cadence`);
    elements.containers.form.removeEventListener(`submit`, this.#currentWorkoutBuilder);

    this.#updateLocalStorage();
  }

  #deleteWorkout(workout, workoutEl) {
    this.workouts.splice(this.workouts.indexOf(workout), 1);

    elements.containers.workouts.removeChild(workoutEl);
    workout.marker.remove();

    this.#updateLocalStorage();
  }

  #displayMarker(workout, workoutTitle = workout.description, workoutType = workout.type) {
    const marker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(L.popup({ closeOnClick: false, autoPan: false, autoClose: false, content: workoutTitle, className: `${workoutType}-popup` }));

    workout.marker = marker;
    marker.openPopup();
  }

  #displayWorkout = (workout, workoutTitle = workout.description, workoutType = workout.type) =>
    elements.containers.workouts.insertAdjacentHTML(
      `afterbegin`,
      `<li class="workout workout--${workoutType}" data-id="${workout.id}">
        <h2 class="workout__title">${workoutTitle}</h2> 
        <div class="workout__details">
          <span class="workout__icon">${this.#workoutText[workoutType].input1Icon}</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout[this.#workoutText[workoutType].input3Prop]}</span>
          <span class="workout__unit">${this.#workoutText[workoutType].input3Unit}</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">${this.#workoutText[workoutType].input4Icon}</span>
          <span class="workout__value">${workout[this.#workoutText[workoutType].input4Prop]}</span>
          <span class="workout__unit">${this.#workoutText[workoutType].input4Unit}</span>
        </div>
        <div  class="workout__toolbox"> 
        <span class="workout__tool tool--edit"><i class="fa-solid fa-pen-to-square"></i></span>
        <span class="workout__tool tool--delete"><i class="fa-solid fa-trash"></i></span>
        </div>
      </li>`
    ); // TODO edit

  #validateFormArguments = (...values) => values.every(v => !Number.isNaN(v) && v > 0);

  #changeFormType() {
    elements.inputs.cadence.closest(`.form__row`).classList.toggle(`form__row--hidden`);
    elements.inputs.elevation.closest(`.form__row`).classList.toggle(`form__row--hidden`);
  }

  #scrollToMarker = workout => this.#map.setView(workout.coords, this.#MapZoom, { animate: true, duration: 0.5 });

  #updateLocalStorage = () => {
    const serializableWorkouts = this.workouts.map(workout => {
      const { _marker, ...rest } = workout;
      return rest;
    });

    localStorage.setItem("workouts", JSON.stringify(serializableWorkouts));
  };

  #getStoredWorkouts() {
    const workouts = JSON.parse(localStorage.getItem(`workouts`)) || [];

    const classMap = { running: Running, cycling: Cycling };
    const restoredWorkouts = workouts.map(w => Reflect.construct(classMap[w.type], [w.distance, w.duration, w.cadence || w.elevation, w.coords, new Date(w.date), w.id]));

    this.workouts = restoredWorkouts;
  }

  #displayStoredWorkouts = () => this.workouts.forEach(w => this.#displayWorkout(w));
}

// ----- Business logic -----
new App();
