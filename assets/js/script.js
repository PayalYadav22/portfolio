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
