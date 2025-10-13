const weatherService = require('../services/weatherervice');

exports.getWeatherByCity = async (req, res) => {
    console.log("API_KEY usada:", process.env.API_KEY);
    
    const city = req.params.city;

    try {
        const weatherData = await weatherService.fetchWeather(city);
        res.json(weatherData);
    } catch (error) {
        console.error("Erro na API de clima:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Erro ao buscar o clima. Tente novamente mais tarde.' });
    }
};