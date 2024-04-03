// shared.js
const navigation = document.querySelector(".heading");

function isMobileDevice() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    // const navigation = entry.target.querySelector(".heading");
    if (entry.isIntersecting) {
      navigation.classList.remove("hidden");
    } else {
      navigation.classList.add("hidden");
    }
  });
}

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.9,
};

export function observeNavigation(sectionClass) {
  const section = document.querySelector(sectionClass);
  if (section && isMobileDevice()) {
    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(section);
  }
}
