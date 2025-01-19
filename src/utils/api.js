import axios from 'axios';

const API_KEY = 'ВАШ_OPENWEATHERMAP_API_KEY';

export const getWeatherByCoords = async (lat, lon) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'ru',
      },
    },
  );
  return response.data;
};

export const getWeatherByCity = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'ru',
      },
    },
  );
  return response.data;
};
