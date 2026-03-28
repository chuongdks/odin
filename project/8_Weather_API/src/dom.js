export function toggleLoader(show) {
    const loader = document.getElementById('loader');
    show ? loader.classList.remove('hidden') : loader.classList.add('hidden');
}

export async function updateWeatherIcon(iconName) {
    const iconImg = document.getElementById('icon-slot');
    try {
        // Webpack resolves this string to a dynamic path
        const iconModule = await import(`../assets/icons/${iconName}.svg`);
        console.log("Icon name: ", iconModule)
        iconImg.src = iconModule.default;

    } catch (err) {
        console.warn(`Icon "${iconName}" not found in /assets/icons/`, err);
        // Fallback to a generic icon if the specific one is missing
        iconImg.src = "";
    }
}

export function renderTextData(weather, isFahrenheit) {
    const display = document.getElementById('weather-display');
    display.classList.remove('hidden');
    
    document.getElementById('city-name').textContent = weather.address;
    document.getElementById('description').textContent = weather.description;
    
    const temp = isFahrenheit ? `${weather.tempF}°F` : `${weather.tempC}°C`;
    document.getElementById('temp-display').textContent = temp;
}