import { fetchWeather, fetchWeatherGif } from './api.js';
import { processWeatherData } from './processor.js';
import { renderTextData, toggleLoader, updateWeatherIcon } from './dom.js';

let currentData = null;
let isFahrenheit = true;

const form = document.getElementById('weather-form');
const unitBtn = document.getElementById('unit-toggle');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const locInput = document.getElementById('location');
    if (!locInput.validity.valid) return;

    try {
        toggleLoader(true);
        const raw = await fetchWeather(locInput.value);
        currentData = processWeatherData(raw);
        
        // Parallel loading for performance
        const [gifUrl] = await Promise.all([
            fetchWeatherGif(currentData.conditions),
            updateWeatherIcon(currentData.icon)
        ]);

        document.getElementById('weather-gif').src = gifUrl;
        renderTextData(currentData, isFahrenheit);
    } catch (err) {
        alert(err.message);
    } finally {
        toggleLoader(false);
    }
});

unitBtn.addEventListener('click', () => {
    isFahrenheit = !isFahrenheit;
    unitBtn.textContent = isFahrenheit ? "Switch to °C" : "Switch to °F";
    if (currentData) renderTextData(currentData, isFahrenheit);
});