// business logic stuff
export function processWeatherData(rawData) {
    const current = rawData.currentConditions;
    return {
        address: rawData.resolvedAddress,
        tempF: current.temp,
        tempC: ((current.temp - 32) * 5 / 9).toFixed(1),
        conditions: current.conditions,
        icon: current.icon,
        description: rawData.description
    };
}