"use strict";

// ----- Coding Challenge 2 -----

// Build an image loading functionality on the web page. As soon the page is opened an image should start to load in the background. When it has finished loading display it for 2 seconds. Repeat the same steps for every image in the img folder.

// PART 1
// 1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

// PART 2
// 1. Comsume the promise using .then and also add an error handler;
// 2. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
// 3. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image;
// 4. After the second image has loaded, pause execution for 2 seconds again;
// 5. After the 2 seconds have passed, hide the current image.

// TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to '3G' in the dev tools Network tab, otherwise images load too fast.

const imgsContainer = document.querySelector(`.images`);

const hideImg = img => (img.style.display = `none`);
const wait = (miliseconds, callback) => new Promise(resolve => setTimeout(() => resolve(callback), miliseconds));

// --- 1.1 ---
function createImage(imgPath) {
  return new Promise(function executor(resolve, reject) {
    const img = document.createElement(`img`);
    img.src = imgPath;

    img.addEventListener(`load`, function () {
      imgsContainer.appendChild(img);
      resolve(img);
    });

    img.addEventListener(`error`, () => reject(`Error loading the desired image!`));
  });
}

// --- 2.1 ---
createImage(`img/img-1.jpg`)
  .then(img => wait(2000, img)) // --- 2.2 ---
  .then(img => hideImg(img)) // --- 2.3 ---
  .then(() => createImage(`img/img-2.jpg`))
  .then(img => wait(2000, img)) // --- 2.4 ---
  .then(img => hideImg(img)) // --- 2.5 ---
  .catch(error => console.error(error.message));
