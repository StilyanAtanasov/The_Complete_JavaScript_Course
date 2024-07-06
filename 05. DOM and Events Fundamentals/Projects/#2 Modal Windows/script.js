"use strict";

// ----- Data -----
const elements = {
  openBtns: document.querySelectorAll(`.show-modal`),
  closeBtn: document.querySelector(`.close-modal-box`),
  modal: document.querySelector(`.modal`),
  overlay: document.querySelector(`.overlay`),
  modalHeading: document.querySelector(`.modal-heading`),
  modalText: document.querySelector(`.modal-text`),
};

const texts = {
  explanation: {
    title: `Explanation of Modal Windows 🏫`,
    text: `Modal windows are a type of graphical user interface (GUI) element used to capture the
          user's full attention, requiring them to interact with the window before returning to the
          parent application. They often appear as pop-up dialogs that overlay the main content.
          This design ensures that users must complete a specific task, such as confirming an
          action, providing additional information, or reading an important message, before they can
          continue. Modal windows are commonly used in web design for forms, alerts, and messages.
          Their primary advantage is to prevent users from being distracted by other elements on the
          screen, thereby improving focus and ensuring critical actions are acknowledged. 🚵`,
  },
  funFacts: {
    title: `Fun Facts about Modal Windows 🎈`,
    text: `Did you know that the concept of modal windows dates back to early desktop software? One
          of the earliest implementations can be found in the Xerox Star, a pioneering personal
          computer developed in the 1980s. Modal windows have also made their way into popular
          culture. For example, in the movie "Iron Man," Tony Stark's holographic interfaces
          frequently use modal-like interactions, emphasizing the importance of certain tasks.
          Additionally, modal windows have their critics; they can be frustrating if overused,
          leading to what's known as "modal window fatigue." Designers strive to balance their use
          to maintain a smooth user experience.`,
  },
  bestPractices: {
    title: `Best Practices for Using Modal Windows ✅`,
    text: `When designing modal windows, it is crucial to follow best practices to ensure they
          enhance rather than hinder user experience. Firstly, modals should be used sparingly and
          only for critical tasks that require immediate attention. Secondly, ensure that the
          content within the modal is concise and relevant to the task at hand. Overloading a modal
          with too much information can overwhelm users. Thirdly, provide a clear and easily
          accessible way to close the modal, such as a close button or clicking outside the modal
          area. Lastly, make sure that the modal is accessible, meaning it should be navigable using
          a keyboard and screen readers to accommodate all users. By adhering to these principles,
          designers can effectively utilize modal windows to improve user interaction without
          causing frustration. 👌`,
  },
};

// ----- Functions -----
function visualiseModal() {
  elements.modal.classList.remove(`hidden`);
  elements.overlay.classList.remove(`hidden`);
}

function hideModal() {
  elements.modal.classList.add(`hidden`);
  elements.overlay.classList.add(`hidden`);
}

function appendTextToModal(heading, text) {
  elements.modalHeading.textContent = heading;
  elements.modalText.textContent = text;
}

// ----- Listeners -----
// --- Modal opening ---
for (let i = 0; i < elements.openBtns.length; i++) {
  elements.openBtns[i].addEventListener(`click`, function () {
    visualiseModal();
    const btnId = elements.openBtns[i].id; // Gets the id of the button which matches the proper key in the texts object !!!
    appendTextToModal(texts[btnId].title, texts[btnId].text);
  });
}

// --- Modal closing ---
elements.closeBtn.addEventListener(`click`, hideModal);
elements.overlay.addEventListener(`click`, hideModal);

document.addEventListener(`keydown`, function (event) {
  if (event.key === `Escape` && !elements.modal.classList.contains(`hidden`)) hideModal();
});
