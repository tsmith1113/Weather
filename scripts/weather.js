"use strict"

let cities = [
    { name: "Benbrook, TX", latitude: 32.6732, longitude: -97.4606 },
    { name: "Atlanta, GA", latitude: 33.749, longitude: -84.388 },
    { name: "New York City, NY", latitude: 40.7128, longitude: -74.006 },
    { name: "Los Angeles, CA", latitude: 34.0522, longitude: -118.2437 },
    { name: "Chicago, IL", latitude: 41.8781, longitude: -87.6298 },
    { name: "Houston, TX", latitude: 29.7604, longitude: -95.3698 },
    { name: "Philadelphia, PA", latitude: 39.9526, longitude: -75.1652 },
    { name: "Phoenix, AZ", latitude: 33.4484, longitude: -112.074 },
    { name: "San Antonio, TX", latitude: 29.4241, longitude: -98.4936 },
    { name: "Seattle, WA", latitude: 47.6062, longitude: -122.3321 }
];

const cityDropdown = document.getElementById("cityDropdown");
const tableBody = document.getElementById("tableBody");


window.onload = function () {
    addCityDropdown();
    cityDropdown.onchange = getSelectedCity;

}

function addCityDropdown() {
    cityDropdown.innerHTML = "";

    let newOption = document.createElement("option");
    newOption.textContent = "Select One";
    newOption.value = "";
    cityDropdown.appendChild(newOption);

    for (let i = 0; i < cities.length; i++) {
        let option = cities[i].name;
        let newOption = document.createElement("option");
        newOption.value = option;
        newOption.textContent = option;
        cityDropdown.appendChild(newOption);
    }

}

function getSelectedCity() {
    let selectedOption = cityDropdown.value;

    if (selectedOption != "") {

        let selectedCity = cities.find(city => city.name === selectedOption);

        if (selectedCity) {
            let stationLookupUrl =
                `https://api.weather.gov/points/${selectedCity.latitude},${selectedCity.longitude}`;

            fetch(stationLookupUrl)
                .then(response => response.json())
                .then(data => {
                    let weatherUrl = data.properties.forecast; // gets the weather url from the response data

                    getWeather(weatherUrl);  //call the helper function to get the actual forcast   
                });
        }

    }

}

function getWeather(weatherUrl) {

    fetch(weatherUrl)
        .then(response => response.json())
        .then(weatherData => {
            let forecastArray = weatherData.properties.periods;
            displayWeather(forecastArray);
        });
}

function displayWeather(forecastArray) {
    tableBody.innerHTML = "";

    for (let i = 0; i < forecastArray.length; i++) {
        const forecast = forecastArray[i];
        let row = tableBody.insertRow(-1);

        let cell1 = row.insertCell(0);
        cell1.innerHTML = forecast.name;

        let cell2 = row.insertCell(1);
        cell2.innerHTML = forecast.temperature + " " + forecast.temperatureUnit;

        let cell3 = row.insertCell(2);
        cell3.innerHTML = forecast.windDirection + " " + forecast.windSpeed;

        let cell4 = row.insertCell(3);
        cell4.innerHTML = forecast.shortForecast;

        // Add cell for the icon
        let cell5 = row.insertCell(4);
        let iconImg = document.createElement("img");
        iconImg.src = forecast.icon; 
        iconImg.alt = "Weather Icon"; 
        cell5.appendChild(iconImg);
    }
}