import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

// requisite middlewares
app.use(express.static("public"));
app.use(express.json());

//The first page that will open
app.get("/", (req, res) => {
    res.render("webSite.ejs");
});
//backend coordinates weather data fetch from google API
let lat = "";
let lon = "";
// Route to handle incoming latitude and longitude data (Google API)
app.post("/weather", (req, res) => {
    const { latitude, longitude } = req.body;
    
    // Here you can handle the latitude and longitude data as needed

    lat=latitude;
    lon=longitude;
    
});



//weather API
//Go to any Weather API website, login to the website and generate the key
//Here I have used the API from OpenWeather, the link is "https://openweathermap.org/api".

const apiKey = 'parse_your_API_key';

app.get('/weather', async (req, res) => {
  if (lat != null && lon != null) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      const weatherData = response.data;
      res.render("weatherSite.ejs", { resp: weatherData });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Error fetching weather data' });
    }
  } else {
    res.status(400).send('Latitude and Longitude are required.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
