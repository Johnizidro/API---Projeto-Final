const axios = require('axios');

const API_KEY = process.env.API_KEY;
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

exports.fetchWeather = async (city) => {
    const response = await axios.get(BASE_URL, {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
            lang: 'pt'
        }
    });

    const data = response.data;

    return {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        state: data.sys.state || null, // pode não existir
        country: data.sys.country
    };
};