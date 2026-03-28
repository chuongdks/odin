const API_KEY = process.env.WEATHER_API_KEY;
const GIPHY_KEY = process.env.GIPHY_API_KEY;

// return the Visual Crossing full JSON
export async function fetchWeather(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}&contentType=json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Location not found (${response.status})`);
    return await response.json();
}

// return the GIPHY gif source url
export async function fetchWeatherGif(conditions) {
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_KEY}&s=${conditions}+weather`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data.images.original.url;
}