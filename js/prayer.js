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

document.addEventListener("DOMContentLoaded", async () => {
  const saintDiv = document.querySelector(".saint");

  const showSaintDiv = () => {
    if (saintDiv) {
      saintDiv.classList.remove("hidden");
    } else {
      console.log("Element with class 'saint' not found.");
    }
  };

  const hideSaintDiv = () => {
    if (saintDiv) {
      saintDiv.classList.add("hidden");
    } else {
      console.log("Element with class 'saint' not found.");
    }
  };

  const fetchDataFromCache = async () => {
    try {
      const cachedData = localStorage.getItem("cachedData");
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const dataHash = generateDataHash(parsedData); // Generate a hash of the cached data

        // Compare the cached data hash with the last known hash
        if (dataHash === localStorage.getItem("cachedDataHash")) {
          updateDOM(parsedData); // Data in cache is up to date, use it
        } else {
          await fetchData(); // Fetch data from the server if cache is outdated
        }
      } else {
        await fetchData(); // Fetch data from the server if not available in cache
      }
    } catch (error) {
      console.error("Error fetching data from cache:", error);
      hideSaintDiv();
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://curia-backend.onrender.com/api/saint-of-the-day"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data from server");
      }
      const data = await response.json();

      if (!data || Object.keys(data).length === 0) {
        hideSaintDiv();
        return null; // Exit function if data is empty
      }

      // Store fetched data in local storage for caching
      localStorage.setItem("cachedData", JSON.stringify(data));
      localStorage.setItem("cachedDataHash", generateDataHash(data)); // Update the hash

      updateDOM(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      hideSaintDiv();
    }
  };

  const generateDataHash = (data) => {
    // Generate a hash based on specific properties of the data
    const { saintOfTheDay, imageUrl, h4Text, h5Text, paragraphs } = data;
    const dataString = JSON.stringify({
      saintOfTheDay,
      imageUrl,
      h4Text,
      h5Text,
      paragraphs,
    });
    // You can use a hashing library or custom hashing function here
    // For simplicity, let's assume a basic hashing function
    return hashCode(dataString);
  };

  // Basic hash code generation function (can be replaced with a more robust implementation)
  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash &= hash; // Convert to 32bit integer
    }
    return hash.toString();
  };

  const updateDOM = (data) => {
    const saintNameElement = document.getElementById("saint__name");
    const saintImageElement = document.getElementById("saint__image");
    const saintTextElement = document.getElementById("saint__text");
    const saintDobElement = document.getElementById("saint__dob");
    const paragraphsContainer = document.getElementById("saint__paragraphs");

    saintNameElement.textContent = data.saintOfTheDay || "";
    saintImageElement.src = data.imageUrl || "";
    saintTextElement.textContent = data.h4Text || "";
    saintDobElement.textContent = data.h5Text || "";

    // Clear existing content
    paragraphsContainer.innerHTML = "";

    // Update paragraphs
    data.paragraphs.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      paragraphsContainer.appendChild(p);
    });

    showSaintDiv(); // Show the saint div when data is available
  };

  // Fetch data from cache or server
  await fetchDataFromCache();
});

getCurrentMonthData();
