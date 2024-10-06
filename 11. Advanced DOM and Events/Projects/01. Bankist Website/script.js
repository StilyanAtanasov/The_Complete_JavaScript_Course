"use strict";

// ----- Data -----
const elements = {
  header: {
    header: document.querySelector(`.header`),
    nav: document.querySelector(`.nav`),
    navLinksBox: document.querySelector(`.nav__links`),
    learnMoreBtn: document.querySelector(`.btn--scroll-to`),
  },
  features: {
    section: document.getElementById(`section--1`),
  },
  operations: {
    btnContainer: document.querySelector(`.operations__tab-container`),
    contentBox: document.querySelector(`.operations__content`),
  },
  testimonials: {
    btnLeft: document.querySelector(`.slider__btn--left`),
    btnRight: document.querySelector(`.slider__btn--right`),
    dotsBox: document.querySelector(`.dots`),
  },
  other: {
    btnGoTop: document.querySelector(`.btn--go-top`),
    btnsRedirect: document.querySelectorAll(`.btn--redirect`),
    allSections: document.querySelectorAll(`.section`),
    allImages: document.querySelectorAll(`.features__img`),
    allSlides: document.querySelectorAll(`.slide`),
  },
};

const content = {
  operations: {
    operation1: {
      icon: `img/icons.svg#icon-upload`,
      iconClass: `operations__icon operations__icon--1`,
      heading: `Transfer money to anyone, instantly! No fees, no hassle.`,
      text: `Send money effortlessly with our instant transfer feature. Whether you're paying friends or sending funds abroad, we've got you covered with no hidden fees and no unnecessary delays.`,
    },
    operation2: {
      icon: `img/icons.svg#icon-home`,
      iconClass: `operations__icon operations__icon--2`,
      heading: `Deposit or withdraw funds whenever you need.`,
      text: `Enjoy the flexibility of accessing your money anytime. Make quick deposits or withdrawals to suit your financial needs, with no waiting periods or limitations.`,
    },
    operation3: {
      icon: `img/icons.svg#icon-user-x`,
      iconClass: `operations__icon operations__icon--3`,
      heading: `No longer need your account? Close it instantly.`,
      text: `We make account management simple. If you decide to close your account, you can do so in just a few clicks, with all of your data securely handled and no strings attached.`,
    },
  },
};

// ----- Global -----
let currentOperationsTab = 1;
let currentSliderState = 1;

// ----- Functions -----
const goTop = () => document.body.scrollIntoView();
const redirect = () => (window.location.href = "https://st-atanasov-bankist-app-v2.vercel.app/");
const getOperationElement = (tab, key) => content.operations[`operation${tab}`][key];
const handleNavHovered = e =>
  e.target.classList.contains(`nav__link`) && [...elements.header.navLinksBox.children].forEach(c => c.querySelector(`.nav__link`) !== e.target && c.classList.toggle(`fade`)) && console.log(e.target);
const handleLearnMore = () => elements.features.section.scrollIntoView();

function changeOperationsTab(e) {
  const targetButton = e.target.closest(`.operations__tab`);
  if (!targetButton) return;

  document.querySelector(`.operations__tab--${currentOperationsTab}`).classList.remove(`operations__tab--active`);
  targetButton.classList.add(`operations__tab--active`);

  const tab = targetButton.dataset.tab;
  currentOperationsTab = tab;

  elements.operations.contentBox.querySelector(`use`).setAttribute(`href`, getOperationElement(tab, `icon`));
  elements.operations.contentBox.querySelector(`.operations__icon`).setAttribute(`class`, getOperationElement(tab, `iconClass`));
  elements.operations.contentBox.querySelector(`h5`).textContent = getOperationElement(tab, `heading`);
  elements.operations.contentBox.querySelector(`p`).textContent = getOperationElement(tab, `text`);
}

function toggleFixedElements(e) {
  const isIntersecting = e[0].isIntersecting;
  elements.header.nav.classList.toggle(`sticky`, !isIntersecting);
  elements.other.btnGoTop.classList.toggle(`hidden`, isIntersecting);
}

function revealSection(entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;

  entry.target.classList.remove(`section--hidden`);
  observer.unobserve(entry.target);
}

function revealImage(entries, observer) {
  const entryTarget = entries[0].target;

  entryTarget.src = entryTarget.dataset.src;
  entryTarget.addEventListener(`load`, () => entryTarget.classList.remove(`lazy-img`));

  observer.unobserve(entryTarget);
}

function createDots() {
  elements.other.allSlides.forEach((_, i) => elements.testimonials.dotsBox.insertAdjacentHTML(`beforeend`, `<button class="dots__dot" data-slide="${i + 1}"></button>`));
  elements.other.allDots = document.querySelectorAll(`.dots__dot`);
}

function changeSliderState(changeBy) {
  currentSliderState = (currentSliderState + changeBy) % 3;

  if (currentSliderState === 0) return (currentSliderState = 3);

  return currentSliderState;
}

function slideTo(slide) {
  elements.other.allSlides.forEach((s, i) => (s.style.transform = `translateX(${(slide - (i + 1)) * -100}%)`));
  elements.other.allDots.forEach(d => d.classList.remove(`dots__dot--active`));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add(`dots__dot--active`);
}

function handleDotsClick(e) {
  e.target.classList.contains(`dots__dot`) && slideTo((currentSliderState = Number(e.target.dataset.slide)));
}

// ----- Main Logic -----
goTop();
createDots();
slideTo(1);

new IntersectionObserver(toggleFixedElements, {
  root: null,
  threshold: 0,
  rootMargin: `-${window.getComputedStyle(elements.header.nav).height}`,
}).observe(elements.header.header);

const sectionObserver = new IntersectionObserver(revealSection, {
  threshold: 0.15,
});

elements.other.allSections.forEach(s => {
  s.classList.add(`section--hidden`);
  sectionObserver.observe(s);
});

const ImgObserver = new IntersectionObserver(revealImage, {
  threshold: 0,
  rootMargin: `200px`,
});

elements.other.allImages.forEach(i => ImgObserver.observe(i));

elements.other.btnsRedirect.forEach(btn => btn.addEventListener(`click`, redirect));
elements.operations.btnContainer.addEventListener(`click`, changeOperationsTab);
elements.header.navLinksBox.addEventListener(`mouseover`, handleNavHovered);
elements.header.navLinksBox.addEventListener(`mouseout`, handleNavHovered);
elements.header.learnMoreBtn.addEventListener(`click`, handleLearnMore);

elements.testimonials.btnLeft.addEventListener(`click`, () => slideTo(changeSliderState(-1)));
elements.testimonials.btnRight.addEventListener(`click`, () => slideTo(changeSliderState(1)));
elements.testimonials.dotsBox.addEventListener(`click`, handleDotsClick);

elements.other.btnGoTop.addEventListener(`click`, goTop);
