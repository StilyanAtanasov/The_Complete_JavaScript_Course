"use strict";

const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

const elements = {
  containers: {
    form: document.querySelector(`.form`),
    workouts: document.querySelector(`.workouts`),
  },
  inputs: {
    type: document.querySelector(`.form__input--type`),
    distance: document.querySelector(`.form__input--distance`),
    duration: document.querySelector(`.form__input--duration`),
    cadence: document.querySelector(`.form__input--cadence`),
    elevation: document.querySelector(`.form__input--elevation`),
  },
};
