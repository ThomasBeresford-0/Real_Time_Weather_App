const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files from the frontend directory
app.use(express.static('../frontend'));

// API key for OpenWeatherMap
const API_KEY = 'b19b04346f7e2671f536d6f584d26e74';

app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
