import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeatherImagePath = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clouds":
        return "./assets/clouds.png";
      case "Clear":
        return "./assets/clear-sky.png";
      case "Haze":
        return "./assets/haze.png";
      case "Drizzle":
        return "./assets/drizzle.png";
      case "Rain":
        return "./assets/rain.png";
      default:
        return "./assets/cloud-icon.png";
    }
  };

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e2e4506ba6c8c8fe629a0fc36f218954&&units=metric`;

      axios
        .get(apiUrl)
        .then((res) => {
          setLoading(true);
          const imagePath = getWeatherImagePath(res.data.weather[0].main);
          console.log(res.data);
          setData({
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            setError("City not found. Please enter a valid city name.");
          } else {
            setError("An unexpected error occurred. Please try again later.");
            console.error(err);
          }
          setLoading(true);
          setData({}); //data will be reset here
        });
    } else {
        setError("You must Enter a City name in SearchBox");
        setLoading(true);
    }
  };
  return (
    <div className="container">
        <div className="heading">
            <h1>Welcome to Weather Tracker</h1>
        </div>
      <div className="weather-card">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <img src="./assets/search.png" alt="search" onClick={handleClick} />
        </div>

        {loading && Object.keys(data).length === 0 ? (
          <div className="error">
            <p>{error}</p>
            <img src="./assets/sad.png" alt="error-img"/>
          </div>
        ) : Object.keys(data).length > 0 ? (
          <div className="weather-info">
            <img src={data.image} alt="weather" />
            <h1>{Math.round(data.celcius)}°C</h1>
            <h2>{data.name}</h2>

            <div className="details">
              <div className="col">
                <img src="./assets/humid.png" alt="humidity" />
                <div>
                  <p>{Math.round(data.humidity)}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img src="./assets/wind1.png" alt="wind" />
                <div>
                  <p>{Math.round(data.speed)}km/h</p>
                  <p>Wind</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;