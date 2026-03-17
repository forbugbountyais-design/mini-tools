// OpenWeatherMap API Key
const API_KEY = '94896f2492970d98bc4f60f329c98b6a';

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (city) fetchWeather(city);
}
async function fetchWeather(city) {
  if (!city) return;

  const lang = window.LANG === 'en' ? 'en' : 'tr';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=${lang}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Şehir bulunamadı veya API hatası');

    const data = await response.json();
    displayWeather(data);
  } catch (err) {
    document.getElementById('weatherCard').textContent = `❌ ${err.message}`;
  }
}

function displayWeather(data) {
  const icons = {
    '01d':'☀️','01n':'🌙','02d':'⛅','02n':'🌥️',
    '03d':'☁️','03n':'☁️','04d':'☁️','04n':'☁️',
    '09d':'🌧️','09n':'🌧️','10d':'🌦️','10n':'🌧️',
    '11d':'⛈️','11n':'⛈️','13d':'❄️','13n':'❄️',
    '50d':'🌫️','50n':'🌫️'
  };
  const icon = icons[data.weather[0].icon] || '🌡️';
  const isEN = window.LANG === 'en';

  const html = `
    <h2>📍 ${data.name}, ${data.sys.country}</h2>
    <div style="font-size:4rem;">${icon}</div>
    <p>${Math.round(data.main.temp)}°C | ${data.weather[0].description}</p>
    <ul>
      <li>${isEN ? 'Humidity' : 'Nem'}: ${data.main.humidity}%</li>
      <li>${isEN ? 'Wind' : 'Rüzgar'}: ${Math.round(data.wind.speed * 3.6)} km/h</li>
      <li>${isEN ? 'Feels Like' : 'Hissedilen'}: ${Math.round(data.main.feels_like)}°C</li>
    </ul>
  `;

  document.getElementById('weatherCard').innerHTML = html;
}

// Event listener ve auto load
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('cityInput');
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') fetchWeather(input.value.trim());
    });
  }
  fetchWeather('Istanbul'); // Default şehir
});
