"use strict";

// ----- Coding Challenge 3 -----

// PART 1
// 1. Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
// Don't forget to test the error handler, and to set the network speed to '3G' in the dev tools Network tab.

// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
// 2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array 😉
// 5. Add the 'parallel' class to all the images (it has some CSS styles).

// TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

const imgsContainer = document.querySelector(`.images`);
const imgs = [`img/img-1.jpg`, `img/img-2.jpg`, `img/img-3.jpg`];

const hideImg = img => (img.style.display = `none`);
const wait = miliseconds => new Promise(resolve => setTimeout(resolve, miliseconds));

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

// --- 1.1 ---
async function loadNPause() {
  try {
    const img1 = await createImage(`img/img-1.jpg`);
    await wait(2000);
    hideImg(img1);

    const img2 = await createImage(`img/img-2.jpg`);
    await wait(2000);
    hideImg(img2);
  } catch (error) {
    console.error(error.message);
  }
}

loadNPause();

// --- 2.1 ---
async function loadAll(imgArr) {
  // --- 2.2 ---
  const imgs = imgArr.map(async i => await createImage(i));
  // --- 2.3 ---
  console.log(imgs);

  // --- 2.4 ---
  const resolved = await Promise.allSettled(imgs);
  // --- 2.5 ---
  resolved.forEach(i => i.value.classList.add(`parallel`));
}

loadAll(imgs);
