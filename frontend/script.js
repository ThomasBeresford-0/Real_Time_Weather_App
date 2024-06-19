const form = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cityName = cityInput.value.trim();
    if (cityName) {
        try {
            const response = await fetch(`http://localhost:3000/weather/${cityName}`);
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            const data = await response.json();
            showWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = `<p>Weather data not available for ${cityName}</p>`;
        }
    }
});

function showWeather(data) {
    const { name, main, weather } = data;
    const weatherHTML = `
        <h2>${name}</h2>
        <p>${weather[0].description}</p>
        <p>Temperature: ${main.temp} &deg;C</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
    weatherInfo.innerHTML = weatherHTML;
}
