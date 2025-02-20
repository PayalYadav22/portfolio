// add Event on multiple element

const addEventOnElements = function (element, eventType, callback) {
  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener(eventType, callback);
  }
};

// preLoader

const loader = document.querySelector("[data-load]");

window.addEventListener("load", () => {
  loader.classList.add("load");
  document.body.classList.remove("active");
});

// mobile toggler

const [navToggler, navLinks, navbar, overlay] = [
  document.querySelectorAll("[data-nav-toggler]"),
  document.querySelectorAll("[data-nav-link]"),
  document.querySelector("[data-navbar]"),
  document.querySelector("[data-overlay]"),
];

const togglerNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElements(navToggler, "click", togglerNav);

const closeNav = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
};

addEventOnElements(navLinks, "click", closeNav);

// header

const header = document.querySelector("[data-header]");

const activeEventOnElements = function () {
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

window.addEventListener("scroll", activeEventOnElements);

// text animation effect for hero  section

const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxIndex;

const setLetterEffect = function () {
  // loop throught all letter boxes

  for (let i = 0; i < letterBoxes.length; i++) {
    // set initial animation delay
    let letterAnimationDelay = 0;

    // get all character from the  current  letter box
    const letters = letterBoxes[i].textContent.trim();

    // remove all character from the current letter box
    letterBoxes[i].textContent = "";

    // loop throught all letters
    for (let j = 0; j < letters.length; j++) {
      // create span
      const span = document.createElement("span");
      // set animation delay on span
      span.style.animationDelay = `${letterAnimationDelay}s`;
      // set the "in" class on the span, if current letter box is  active
      // otherwise class "out"
      if (i === activeLetterBoxIndex) {
        span.classList.add("in");
      } else {
        span.classList.add("out");
      }
      // pass current letter into span
      span.textContent = letters[j];
      // add space class on span, when current letter contain space
      if (letters[j] === " ") span.classList.add("space");
      // pass the span on current letter box
      letterBoxes[i].append(span);
      // skip letterAnimationDelay when loop is in the last index
      if (j >= letters.length - 1) break;
      // otherwise update
      letterAnimationDelay += 0.05;
    }

    // get total delay of active letter box
    if (i === activeLetterBoxIndex) {
      totalLetterBoxIndex = Number(letterAnimationDelay.toFixed(2));
    }

    // add active class on last active letter box
    if (i === lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add("active");
    } else {
      letterBoxes[i].classList.remove("active");
    }
  }

  setTimeout(() => {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

    // update activeLetterBoxIndex based on total letter boxes
    activeLetterBoxIndex >= letterBoxes.length - 1
      ? (activeLetterBoxIndex = 0)
      : activeLetterBoxIndex++;
    setLetterEffect();
  }, totalLetterBoxIndex * 1000 + 3000);
};

window.addEventListener("load", () => {
  setLetterEffect();
});

// back to top

const backToTop = document.querySelector("[ data-back-top-btn]");

window.addEventListener("scroll", () => {
  const bodyHeight = document.body.scrollHeight;

  console.log(bodyHeight);
  const windowHeight = window.innerHeight;
  const scrollEndPosition = bodyHeight - windowHeight;
  const totalScrollPercent = (window.scrollY / scrollEndPosition) * 100;

  backToTop.textContent = `${totalScrollPercent.toFixed(0)}%`;
});
