const API_KEY = process.env.WEATHER_API_KEY;
const GIPHY_KEY = process.env.GIPHY_API_KEY;

let currentData = null; 
let isFahrenheit = true;

// --- Event Listeners ---
document.getElementById('unit-toggle').addEventListener('click', (e) => {
    if (!currentData) return; // Don't toggle if no data exists
    isFahrenheit = !isFahrenheit;
    e.target.textContent = isFahrenheit ? "Switch to °C" : "Switch to °F";
    updateTempDisplay();
});

document.getElementById('weather-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const locInput = document.getElementById('location');
    
    // Using Constraint Validation API
    if (locInput.validity.valid) {
        const data = await fetchWeather(locInput.value);
        if (data) renderWeather(data);
    } else {
        displayError("Please enter a valid location.");
    }
});

// --- API Logic ---
// Weather API Fetcher
async function fetchWeather(location) {
    const loader = document.getElementById('loader');
    loader.classList.remove('hidden');
    
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}&contentType=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // This catches 400 (Bad Request), 401 (Unauthorized), and 404 (Not Found)
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const rawData = await response.json();
        console.log("Raw Weather Data:", rawData);
        
        return processData(rawData);
    } catch (err) {
        displayError(err.message);
        console.error("Fetch failed:", err.message);
        return null;
    } finally {
        loader.classList.add('hidden');
    }
}

// Giphy API
async function fetchGif(query) {
    try {
        const url = `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_KEY}&s=${query}`;
        const response = await fetch(url);
        const responseData = await response.json();
        
        // Safety check for Giphy response
        if (responseData.data && responseData.data.images) {
            return responseData.data.images.original.url;
        }
        return "#";
    } catch (error) {
        console.error("Giphy fetch failed:", error);
        return "#";
    }
}

// --- Data Processing ---
function processData(data) {
    const current = data.currentConditions;
    
    return {
        address: data.resolvedAddress,
        tempF: current.temp,
        tempC: ((current.temp - 32) * 5 / 9).toFixed(1),
        conditions: current.conditions,
        icon: current.icon,
        description: data.description 
    };
}

// --- DOM Rendering ---
async function renderWeather(weather) {
    currentData = weather;
    const display = document.getElementById('weather-display');
    display.classList.remove('hidden');

    // Update Text Data
    document.getElementById('city-name').textContent = weather.address;
    document.getElementById('description').textContent = weather.conditions;
    updateTempDisplay();

    // Update Visuals (Icon and Gif)
    updateWeatherIcon(weather.icon);
    const gifUrl = await fetchGif(weather.conditions);
    document.getElementById('weather-gif').src = gifUrl;
}

// --- Helper Function ---
function updateWeatherIcon(iconName) {
    const iconImg = document.getElementById('icon-slot');
    if (!iconImg) return;

    // Direct pathing for Vanilla JS
    iconImg.src = `./assets/icons/${iconName}.svg`;
    
    iconImg.onerror = () => {
        console.warn(`Icon ${iconName} not found at ./assets/icons/`);
        iconImg.src = './assets/icons/default.svg';                     // Fall back icon, dont have this yet should make one
    };
}

function updateTempDisplay() {
    const tempText = isFahrenheit ? `${currentData.tempF}°F` : `${currentData.tempC}°C`;
    document.getElementById('temp-display').textContent = tempText;
}

function displayError(msg) {
    const errorSpan = document.querySelector('.error-msg');
    errorSpan.textContent = msg;
    setTimeout(() => errorSpan.textContent = "", 10000);
}
