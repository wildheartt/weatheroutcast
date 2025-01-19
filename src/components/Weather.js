import { getWeatherByCoords, getWeatherByCity } from '../utils/api';
import { addToHistory } from '../utils/storage';

const Weather = () => {
  const weatherDiv = document.getElementById('weather');

  const renderWeather = (data, mapUrl) => {
    weatherDiv.innerHTML = `
      <div class="weather-info">
        <h2>${data.name}</h2>
        <p>${data.main.temp}°C</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
      </div>
      <div class="map">
        <img src="${mapUrl}" alt="Карта ${data.name}">
      </div>
    `;
  };

  const fetchAndDisplayWeather = async (city) => {
    try {
      const data = await getWeatherByCity(city);
      const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${data.coord.lat},${data.coord.lon}&zoom=12&size=600x300&key=ВАШ_GOOGLE_MAPS_API_KEY`;
      renderWeather(data, mapUrl);
      addToHistory(city);
      const history = await import('./History').then((module) =>
        module.default(),
      );
    } catch (error) {
      weatherDiv.innerHTML = `<p>Не удалось получить погоду для "${city}". Проверьте правильность ввода.</p>`;
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await getWeatherByCoords(latitude, longitude);
            const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=12&size=600x300&key=ВАШ_GOOGLE_MAPS_API_KEY`;
            renderWeather(data, mapUrl);
            addToHistory(data.name);
            const history = await import('./History').then((module) =>
              module.default(),
            );
          } catch (error) {
            weatherDiv.innerHTML = `<p>Не удалось получить погоду по вашему местоположению.</p>`;
          }
        },
        (error) => {
          weatherDiv.innerHTML = `<p>Не удалось определить ваше местоположение.</p>`;
        },
      );
    } else {
      weatherDiv.innerHTML = `<p>Геолокация не поддерживается вашим браузером.</p>`;
    }
  };

  const createForm = () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" id="city-input" placeholder="Введите город" required>
      <button type="submit">Показать погоду</button>
    `;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const city = document.getElementById('city-input').value.trim();
      if (city) {
        fetchAndDisplayWeather(city);
        form.reset();
      }
    });
    weatherDiv.prepend(form);
  };

  createForm();
  getUserLocation();
};

export default Weather;

window.addEventListener('citySelected', (e) => {
  const city = e.city;
  fetchAndDisplayWeather(city);
});