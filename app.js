document.addEventListener('DOMContentLoaded', function() {
    const apikey = "01f41da9014194fe0f19719ca1d62f76";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

    const searchBar = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const card = document.querySelector(".card"); // Select the .card element

    async function weatherCheck(city) {
        const response = await fetch(`${apiUrl}${city}&appid=${apikey}`);
        var data = await response.json();

        // Check if the API response contains an error
        if (data.cod !== 404) {
            // If there's an error, update the .card's box-shadow to red
            card.style.boxShadow = "0 8px 32px 0 rgba(255, 0, 0, 0.37)"; // Red box-shadow
            // Ensure .weather remains hidden
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".error").innerHTML = data.message;
            document.querySelector(".error").style.display = "block";
        } if(data.cod = 200) {
            // If there's no error, proceed with updating the weather information
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
            document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + "%"; 
            document.querySelector(".description").innerHTML = data.weather[0].description;
            document.querySelector(".wind").innerHTML = "Wind speed: " + data.wind.speed + " km/h";

            // Show the weather information
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";

            // Reset the .card's box-shadow to its original color
            card.style.boxShadow = "0 8px 32px 0 rgba(31, 38, 135, 0.37)"; // Original box-shadow color
        }
    }

    searchBtn.addEventListener("click", () => {
        weatherCheck(searchBar.value);
    });

    // Add an event listener to the search bar for the 'keypress' event
    searchBar.addEventListener('keypress', function(event) {
        // Check if the key pressed was Enter
        if (event.key === 'Enter') {
            // Prevent the default form submission behavior
            event.preventDefault();
            // Trigger the button's click event
            searchBtn.click();
        }
    });
});
