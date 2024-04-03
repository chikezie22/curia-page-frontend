const Pmonth = document.getElementById("patrician__month");
const title = document.getElementById("patrician__title");
const Ppraesidium = document.getElementById("patrician__praesidia");
const saint = document.querySelector(".saint");
const patricianObj = [
  {
    month: "March",
    topic: "Sowing the seeds and reaping the fruits of Evangelization",
    praesidium: "Virgin Most Faithful, and Refuge of Sinners",
  },
  {
    month: "April",
    topic: "Spiritual connectivity, Faith and Evangelization",
    praesidium: "Virgin Most Admirable, and Mother of our Savior",
  },
  {
    month: "May",
    topic:
      "Legionaries and Evangelization: its key roles for a better practice of the Catholic Faith",
    praesidium: "Seat of Wisdom and Perpetual help",
  },
  {
    month: "June",
    topic: "Evangelization: a call to reawaken the Apostolic Zeal",
    praesidium: "Mediatrix of All Graces and Comforter of the Afflicted",
  },
  {
    month: "July",
    topic:
      "Legionary visitation (Home, Hospital, Prison, Hotel, Hostel, Psychiatric homes, etc) as a means of promoting Evangelization",
    praesidium: "Virgin Most Merciful and Virgin Most Pure",
  },
  {
    month: "August",
    topic:
      "Promoting the spirit of Peregnitio Pro Christo, Incolae Mariae and Exploratio Dominicalis as means of propagating the gospel everwhere",
    praesidium: "Queen of Peace and Immaculate Heart",
  },
  {
    month: "September",
    topic:
      "The use of the Holy Bible in carrying out the Evangelization mandate",
    praesidium: "Mirror of Justice and Virgin Most Powerful",
  },
  {
    month:
      "October', topic:'The three T's (Time Talent and Treasure) as vital tools for evangelization.",
    praesidium:
      "Ark of the Convenant, Vessel of Honour and Immaculate Conception",
  },
  {
    month: "November",
    topic:
      "Home to Home visitation and the challenges of material relief in the present evangelization drive.",
    praesidium: "Gate of Heaven, Mother of Divine Grace and Queen of Angels",
  },
];

const getCurrentMonthData = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  const currentMonthData = patricianObj.find(
    (obj) => obj.month === currentMonth
  );
  if (currentMonthData) {
    const { month, topic, praesidium } = currentMonthData;

    Pmonth.textContent = `Welcome to the month of ${month} 🥰`;
    title.textContent = `Topic: ${topic}`;
    Ppraesidium.textContent = `Hosting Praesidia : ${praesidium}`;
  } else {
    Pmonth.textContent = `No Content for this month 🥲`;
  }
};
const div = document.querySelector(".saint");

const pat = document.querySelector(".patrician");

window.addEventListener("DOMContentLoaded", async () => {
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

  // Hide the saint div by default
  hideSaintDiv();

  const apiCall = async function () {
    // Load environment variables from .env file
    try {
      const response = await fetch(
        "https://curia-backend.onrender.com/api/saint-of-the-day"
      );
      // console.log(process.env.RENDER_APP_API_URL);
      const data = await response.json();

      if (!data || Object.keys(data).length === 0) {
        hideSaintDiv();
        return; // Exit function if data is empty
      }

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

  apiCall();
  getCurrentMonthData();
});
