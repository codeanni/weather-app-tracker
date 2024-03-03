import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // for conditional rendering

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e2e4506ba6c8c8fe629a0fc36f218954&&units=metric`;

      axios
        .get(apiUrl)
        .then((res) => {
          setLoading(true);
          console.log(res.data);
          setData({
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
            description: res.data.weather[0].description
          });
        
          setError("");
        })
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.status === 404) {
            setError("City not found. Please enter a valid city name.");
          } else {
            setError("An unexpected error occurred. Please try again later.");
            
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
            <h3>{data.description} </h3>

            <h1>{Math.round(data.celcius)}°C</h1>
            <h2>{data.name}</h2>

            <div className="details">
              <div className="col">
                <img src="./assets/humidity.png" alt="humidity" />
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