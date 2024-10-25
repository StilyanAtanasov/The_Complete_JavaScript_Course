"use strict";

const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

const elements = {
  containers: {
    form: document.querySelector(`.form`),
    workouts: document.querySelector(`.workouts`),
    errorBox: document.querySelector(`.error__box`),
  },
  inputs: {
    type: document.querySelector(`.form__input--type`),
    distance: document.querySelector(`.form__input--distance`),
    duration: document.querySelector(`.form__input--duration`),
    cadence: document.querySelector(`.form__input--cadence`),
    elevation: document.querySelector(`.form__input--elevation`),
  },
  buttons: {
    calcelForm: document.querySelector(`.form__btn.btn--cancel`),
  },
  labels: {
    errorTitle: document.querySelector(`.error__title`),
    errorMessage: document.querySelector(`.error__message`),
    formTitle: document.querySelector(`.form__title`),
  },
};

const errorMessages = {
  unableToLoadMap: {
    title: `Error fetching the map!`,
    message: `We couldn't load the map. This may be due to a denied geolocation request, or an issue with your internet connection. Please check your settings and try again. Page may need to be refreshed!`,
  },
  invalidWorkoutData: {
    title: `Invalid workout data!`,
    message: `It looks like some workout information is missing or incorrect. Please check the inputs and try again.`,
  },
};

const workoutText = {
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
