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

const url = "https://axios-zeta.vercel.app";

document.addEventListener("DOMContentLoaded", async () => {
  const showSaintDiv = () => {
    const saintDiv = document.querySelector(".saint");
    if (saintDiv) {
      saintDiv.classList.remove("hidden");
    } else {
      console.log("Element with class 'saint' not found.");
    }
  };

  const hideSaintDiv = () => {
    const saintDiv = document.querySelector(".saint");
    if (saintDiv) {
      saintDiv.classList.add("hidden");
    } else {
      console.log("Element with class 'saint' not found.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/api/saint-of-the-day`);
      const data = await response.json();

      if (!data || Object.keys(data).length === 0) {
        hideSaintDiv();
        return null; // Exit function if data is empty
      }

      // Store fetched data in local storage for caching
      localStorage.setItem("cachedData", JSON.stringify(data));

      // Update HTML content with fetched data
      document.getElementById("saint__name").textContent =
        data.saintOfTheDay || "";
      document.getElementById("saint__image").src = data.imageUrl || "";
      document.getElementById("saint__text").textContent = data.h4Text || "";
      document.getElementById("saint__dob").textContent = data.h5Text || "";

      // Update paragraphs
      const paragraphsContainer = document.getElementById("saint__paragraphs");
      paragraphsContainer.innerHTML = ""; // Clear existing content
      data.paragraphs.forEach((paragraph) => {
        const p = document.createElement("p");
        p.textContent = paragraph;
        paragraphsContainer.appendChild(p);
      });

      // Show the saint div when data is available
      showSaintDiv();
    } catch (error) {
      console.error(error);
      hideSaintDiv();
    }
  };

  const fetchDataFromCache = () => {
    try {
      const cachedData = localStorage.getItem("cachedData");
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        // Update HTML content with cached data
        document.getElementById("saint__name").textContent =
          parsedData.saintOfTheDay || "";
        document.getElementById("saint__image").src = parsedData.imageUrl || "";
        document.getElementById("saint__text").textContent =
          parsedData.h4Text || "";
        document.getElementById("saint__dob").textContent =
          parsedData.h5Text || "";

        // Update paragraphs
        const paragraphsContainer =
          document.getElementById("saint__paragraphs");
        paragraphsContainer.innerHTML = ""; // Clear existing content
        parsedData.paragraphs.forEach((paragraph) => {
          const p = document.createElement("p");
          p.textContent = paragraph;
          paragraphsContainer.appendChild(p);
        });

        // Show the saint div when cached data is available
        showSaintDiv();
      } else {
        // Fetch data from the server if not available in cache
        fetchData();
      }
    } catch (error) {
      console.error("Error fetching data from cache:", error);
      hideSaintDiv();
    }
  };

  // Fetch data from cache or server
  fetchDataFromCache();
});

// ************************************************************************
