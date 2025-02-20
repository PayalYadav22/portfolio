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

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollEndPos = bodyHeight - windowHeight;
  const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

  backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

  // visible back top btn when scrolled 5% of the page
  if (totalScrollPercent > 5) {
    backTopBtn.classList.add("show");
  } else {
    backTopBtn.classList.remove("show");
  }
});

// scroll reveal

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const element =
      revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;
    if (element) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
};

window.addEventListener("scroll", scrollReveal);

scrollReveal();

// custom cursor

const cursor = document.querySelector("[data-cursor]");

const anchorElements = document.querySelectorAll("a");

const button = document.querySelectorAll("button");

document.body.addEventListener("mousemove", (e) => {
  setTimeout(() => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
  }, 100);
});

// add cursor hovered class

const hoverActive = () => {
  cursor.classList.add("hovered");
};

// remove cursor hovered class

const hoverInactive = () => {
  cursor.classList.remove("hovered");
};

addEventOnElements(anchorElements, "mousemove", hoverActive);
addEventOnElements(anchorElements, "mouseout", hoverInactive);

addEventOnElements(button, "mousemove", hoverActive);
addEventOnElements(button, "mouseout", hoverInactive);

// add disabled class on cursorElement, when mouse out of mody

document.body.addEventListener("mouseout", function () {
  cursor.classList.add("disabled");
});

// remove disabled class on cursorElement, when mouse move of mody

document.body.addEventListener("mousemove", function () {
  cursor.classList.remove("disabled");
});
