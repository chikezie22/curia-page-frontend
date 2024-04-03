// Attach event listeners to links before DOMContentLoaded
// const links = document.querySelectorAll(".header__nav--links--item a");
// const home = this.document.querySelector(".home");
const aboutButton = document.querySelector(".main__content--button");

const primaryNavigation = document.querySelector(".header__nav");
const navToggle = document.querySelector(".mobile-nav-toggle");
navToggle.addEventListener("click", () => {
  const visibility = primaryNavigation.getAttribute("data-visible");
  // console.log(visibility);
  // console.log(primaryNavigation);
  if (visibility === "false") {
    primaryNavigation.setAttribute("data-visible", "true");
    navToggle.setAttribute("aria-expanded", "true");
  } else if (visibility === "true") {
    primaryNavigation.setAttribute("data-visible", "false");
    navToggle.setAttribute("aria-expanded", "false");
  }
});
window.addEventListener("load", function () {
  // Function to set active link
  // function setActiveLink() {
  //   const activeLink =
  //     localStorage.getItem("activeLink") || window.location.href;
  //   // If no active link is stored, set the home link as active

  //   links.forEach((link) => {
  //     if (link.href !== activeLink) {
  //       link.classList.remove("active");
  //     } else {
  //       link.classList.add("active");
  //     }
  //   });
  //   if (!activeLink) {
  //     home.classList.add("active");
  //     return; // Exit the function early
  //   }
  // }

  // Function to load images and add event listeners
  function loadImages() {
    const blurDivs = document.querySelectorAll(".blur-div");

    // Define loaded function outside the loop for efficiency
    function loaded(div) {
      div.classList.add("loaded");

      // Find the closest ancestor with the specified class
      const linkContainer = div.closest(".header__nav--links--item");

      if (linkContainer) {
        // Query for the link within the container
        const link = linkContainer.querySelector("a");
        if (link) {
          // Add 'active' class to the link associated with the loaded image
          link.classList.add("active");
        }
      }
    }

    blurDivs.forEach((div) => {
      const img = div.querySelector("img");

      if (img) {
        if (img.complete) {
          loaded(div); // Call loaded function directly for already loaded images
        } else {
          img.addEventListener("load", () => loaded(div)); // Use arrow function for context
        }
      }
    });
  }

  // addEventListenersToLinks();
  // setActiveLink();
  loadImages();
  // apiCall();
});
window.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".header__nav--links--item a");
  const currentUrl = window.location.href;
  const homeLink = document.querySelector(".home");
  // console.log(currentUrl === homeLink);
  // console.log(currentUrl, homeLink.href);

  // Set 'active' class based on the current URL
  links.forEach((link) => {
    if (link.href === currentUrl) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Ensure home link has 'active' class if current URL is home page
  if (currentUrl == homeLink.href) {
    homeLink.classList.add("active");
  }

  // Add click event listener to links
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Remove 'active' class from all links
      links.forEach((otherLink) => otherLink.classList.remove("active"));

      // Add 'active' class to the clicked link
      this.classList.add("active");

      // Update 'activeLink' in localStorage
      localStorage.setItem("activeLink", this.href);
    });
  });
});
