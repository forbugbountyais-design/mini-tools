// IMPORTANT: Replace with your own OpenWeather API key
// Get a free key at: https://openweathermap.org/api
const API_KEY = '78a0fe42b00385baf50185ab236e4269';


const ICONS = {
  '01d':'☀️','01n':'🌙','02d':'⛅','02n':'🌥️',
  '03d':'☁️','03n':'☁️','04d':'☁️','04n':'☁️',
  '09d':'🌧️','09n':'🌧️','10d':'🌦️','10n':'🌧️',
  '11d':'⛈️','11n':'⛈️','13d':'❄️','13n':'❄️',
  '50d':'🌫️','50n':'🌫️'
};

async function getWeather(city) {
  if (!city) city = document.getElementById('cityInput').value.trim();
  if (!city) return;

  if (API_KEY === 'YOUR_API_KEY_HERE') {
    showDemo(city);
    return;
  }

  const lang = window.LANG === 'en' ? 'en' : 'tr';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=${lang}`;

  try {
    document.getElementById('weatherCard').innerHTML = '<p style="color:var(--muted);text-align:center;padding:2rem;">Yükleniyor...</p>';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Şehir bulunamadı');
    const data = await res.json();
    renderWeather(data);
  } catch(e) {
    document.getElementById('weatherCard').innerHTML = `<p style="color:#ef4444;text-align:center;padding:2rem;">❌ ${e.message || 'Hata oluştu'}</p>`;
  }
}

function renderWeather(data) {
  const icon = ICONS[data.weather[0].icon] || '🌡️';
  const isEN = window.LANG === 'en';
  document.getElementById('weatherCard').innerHTML = `
    <p class="w-city">📍 ${data.name}, ${data.sys.country}</p>
    <div style="font-size:5rem;margin:1rem 0;">${icon}</div>
    <div class="w-temp">${Math.round(data.main.temp)}°C</div>
    <p class="w-desc">${data.weather[0].description}</p>
    <div class="w-details">
      <div class="w-detail">
        <div class="val">${data.main.humidity}%</div>
        <div class="key">${isEN ? 'Humidity' : 'Nem'}</div>
      </div>
      <div class="w-detail">
        <div class="val">${Math.round(data.wind.speed * 3.6)} km/h</div>
        <div class="key">${isEN ? 'Wind' : 'Rüzgar'}</div>
      </div>
      <div class="w-detail">
        <div class="val">${Math.round(data.main.feels_like)}°C</div>
        <div class="key">${isEN ? 'Feels Like' : 'Hissedilen'}</div>
      </div>
    </div>
  `;
}

function showDemo(city) {
  // Demo data when no API key is set
  const demos = {
    'istanbul': { name:'İstanbul', country:'TR', temp:18, desc:'parçalı bulutlu', icon:'02d', humidity:65, wind:15, feels:16 },
    'ankara': { name:'Ankara', country:'TR', temp:12, desc:'az bulutlu', icon:'03d', humidity:55, wind:20, feels:10 },
    'london': { name:'London', country:'GB', temp:9, desc:'overcast clouds', icon:'04d', humidity:80, wind:25, feels:6 },
    'default': { name: city, country:'?', temp:20, desc:'sunny', icon:'01d', humidity:50, wind:10, feels:19 }
  };
  const d = demos[city.toLowerCase()] || demos['default'];
  d.name = d.name || city;
  const icon = ICONS[d.icon] || '☀️';
  const isEN = window.LANG === 'en';
  document.getElementById('weatherCard').innerHTML = `
    <p class="w-city">📍 ${d.name}${d.country !== '?' ? ', ' + d.country : ''}</p>
    <p style="font-size:0.75rem;color:var(--muted);margin-bottom:0.5rem;">${isEN ? '(Demo - Add API key for live data)' : '(Demo - Gerçek veri için API key ekleyin)'}</p>
    <div style="font-size:5rem;margin:1rem 0;">${icon}</div>
    <div class="w-temp">${d.temp}°C</div>
    <p class="w-desc">${d.desc}</p>
    <div class="w-details">
      <div class="w-detail"><div class="val">${d.humidity}%</div><div class="key">${isEN?'Humidity':'Nem'}</div></div>
      <div class="w-detail"><div class="val">${d.wind} km/h</div><div class="key">${isEN?'Wind':'Rüzgar'}</div></div>
      <div class="w-detail"><div class="val">${d.feels}°C</div><div class="key">${isEN?'Feels Like':'Hissedilen'}</div></div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('cityInput');
  if (input) {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') getWeather(); });
  }
  // Auto-load Istanbul
  getWeather('istanbul');
});
