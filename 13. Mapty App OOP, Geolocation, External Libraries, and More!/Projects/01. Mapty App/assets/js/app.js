"use strict";

class App {
  #map;
  #currentWorkoutBuilder;
  #MapZoom = 14;
  #errorInvalidWorkoutArguments = this.#displayErrorMessage.bind(null, errorMessages.invalidWorkoutData);

  constructor() {
    this.workouts = [];
    this.#getPosition();
    this.#getStoredWorkouts();
    this.#changeFormType(false, true);

    elements.inputs.type.addEventListener(`change`, () => this.#changeFormType());
    elements.containers.form.addEventListener(`submit`, e => e.preventDefault());
    elements.containers.workouts.addEventListener(`click`, this.#handleWorkoutClick.bind(this));
  }

  #getPosition = () => navigator.geolocation.getCurrentPosition(this.#displayMap.bind(this), () => this.#displayErrorMessage(errorMessages.unableToLoadMap));

  #displayMap(position) {
    const { latitude, longitude } = position.coords;

    this.#map = L.map(`map`).setView([latitude, longitude], this.#MapZoom);

    L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
    }).addTo(this.#map);

    this.workouts.forEach(w => this.#displayMarker(w));
    this.#displayStoredWorkouts();

    this.#map.on(`click`, this.#renderForm.bind(this));
  }

  #renderForm(_e, title = `Create Workout`, lockSelect = false, callback = () => this.#createWorkout(_e.latlng), ...callbackArgs) {
    this.#currentWorkoutBuilder && elements.containers.form.removeEventListener(`submit`, this.#currentWorkoutBuilder);

    elements.labels.formTitle.textContent = title;
    elements.inputs.type.disabled = lockSelect;
    this.#openForm();
    elements.inputs.distance.focus();

    this.#currentWorkoutBuilder = () => callback(...callbackArgs);
    elements.buttons.calcelForm.addEventListener(`click`, this.#closeForm.bind(this));
    elements.containers.form.addEventListener(`submit`, this.#currentWorkoutBuilder);
  }

  #openForm = () => elements.containers.form.classList.remove(`hidden`);

  #closeForm() {
    elements.containers.form.reset();
    this.#changeFormType(false, true);
    elements.containers.form.classList.add(`hidden`);
    this.#hideErrorMessage();
  }

  #handleWorkoutClick(e) {
    const clicked = e.target;
    const workoutEl = clicked.closest(`.workout`);

    if (!workoutEl) return;

    const workout = this.workouts.find(w => w.id === workoutEl.dataset.id);
    if (clicked.closest(`.workout__tool`)?.classList.contains(`tool--edit`)) return this.#editWorkout(workout);
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
      if (!this.#validateFormArguments(distance, duration, cadence)) return this.#errorInvalidWorkoutArguments();

      workout = new Running(distance, duration, cadence, [lat, lng], dateNow);
    } else {
      const elevation = elements.inputs.elevation.value;
      if (!this.#validateFormArguments(distance, duration, elevation)) return this.#errorInvalidWorkoutArguments();

      workout = new Cycling(distance, duration, elevation, [lat, lng], dateNow);
    }

    const workoutType = workout.type;
    const workoutTitle = workout.description;

    this.workouts.push(workout);
    this.#displayWorkout(workout, workoutTitle, workoutType);

    this.#displayMarker(workout, workoutTitle, workoutType);
    this.#closeForm();
    elements.containers.form.removeEventListener(`submit`, this.#currentWorkoutBuilder);

    this.#updateLocalStorage();
  }

  #editWorkout(workout) {
    elements.inputs.type.disabled = true;
    this.#renderForm(undefined, `Edit Workout`, true, this.#reassignWorkout.bind(this), workout);
    this.#fillForm(workout);
  }

  #reassignWorkout(workout) {
    const type = workout.type;
    const isRunning = type === `running`;

    const distance = elements.inputs.distance.value;
    const duration = elements.inputs.duration.value;
    const cadence = elements.inputs.cadence.value;
    const elevation = elements.inputs.elevation.value;

    if (!this.#validateFormArguments(distance, duration, isRunning ? cadence : elevation)) return this.#errorInvalidWorkoutArguments();

    const workoutEl = elements.containers.workouts.querySelector(`[data-id="${workout.id}"]`);
    workoutEl.querySelector(`.details--input1 .workout__value`).textContent = workout.distance = distance;
    workoutEl.querySelector(`.details--input2 .workout__value`).textContent = workout.duration = duration;
    isRunning ? (workout.cadence = cadence) : (workout.elevation = elevation);

    workoutEl.querySelector(`.details--input3 .workout__value`).textContent = workout[workoutText[type].input3Prop];
    workoutEl.querySelector(`.details--input4 .workout__value`).textContent = workout[workoutText[type].input4Prop];

    this.#updateLocalStorage();
    this.#closeForm();
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
        <div class="workout__details details--input1">
          <span class="workout__icon">${workoutText[workoutType].input1Icon}</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details details--input2">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        <div class="workout__details details--input3">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout[workoutText[workoutType].input3Prop]}</span>
          <span class="workout__unit">${workoutText[workoutType].input3Unit}</span>
        </div>
        <div class="workout__details details--input4">
          <span class="workout__icon">${workoutText[workoutType].input4Icon}</span>
          <span class="workout__value">${workout[workoutText[workoutType].input4Prop]}</span>
          <span class="workout__unit">${workoutText[workoutType].input4Unit}</span>
        </div>
        <div  class="workout__toolbox"> 
        <span class="workout__tool tool--edit"><i class="fa-solid fa-pen-to-square"></i></span>
        <span class="workout__tool tool--delete"><i class="fa-solid fa-trash"></i></span>
        </div>
      </li>`
    );

  #validateFormArguments = (...values) => values.every(v => !Number.isNaN(v) && v > 0);

  #changeFormType(forceCadence, forceElevetion) {
    const isActive = !elements.inputs.cadence.closest(`.form__row`).classList.toggle(`form__row--hidden`, forceCadence);
    elements.inputs.elevation.closest(`.form__row`).classList.toggle(`form__row--hidden`, forceElevetion);

    elements.inputs.cadence.required = isActive;
    elements.inputs.elevation.required = !isActive;
  }

  #scrollToMarker = workout => this.#map?.setView(workout.coords, this.#MapZoom, { animate: true, duration: 0.5 });

  #updateLocalStorage = () => {
    const serializableWorkouts = this.workouts.map(workout => {
      const { _marker, ...rest } = workout;
      return rest;
    });

    localStorage.setItem(`workouts`, JSON.stringify(serializableWorkouts));
  };

  #getStoredWorkouts() {
    const workouts = JSON.parse(localStorage.getItem(`workouts`)) || [];

    const classMap = { running: Running, cycling: Cycling };
    const restoredWorkouts = workouts.map(w => Reflect.construct(classMap[w.type], [w.distance, w.duration, w.cadence || w.elevation, w.coords, new Date(w.date), w.id]));

    this.workouts = restoredWorkouts;
  }

  #displayStoredWorkouts = () => this.workouts.forEach(w => this.#displayWorkout(w));

  #fillForm(workout) {
    elements.inputs.type.value = workout.type;
    elements.inputs.distance.value = workout.distance;
    elements.inputs.duration.value = workout.duration;

    const isRunning = workout.type === `running`;
    isRunning ? (elements.inputs.cadence.value = workout.cadence) : (elements.inputs.elevation.value = workout.elevation);
    this.#changeFormType(!isRunning, isRunning);
  }

  #displayErrorMessage(errorData) {
    elements.labels.errorTitle.textContent = errorData.title;
    elements.labels.errorMessage.textContent = errorData.message;
    elements.containers.errorBox.classList.remove(`hidden`);
  }

  #hideErrorMessage = () => elements.containers.errorBox.classList.add(`hidden`);
}

new App();
