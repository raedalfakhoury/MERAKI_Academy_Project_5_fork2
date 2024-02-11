/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import axios from "axios";
import { FaTemperatureArrowUp, FaTemperatureArrowDown } from "react-icons/fa6";
import { MdOutlineDescription } from "react-icons/md";
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import '../Weather/Weather.css'
function Weather() {
  const [currentWeather, setCurrentWeather] = useState();
  const [loader, setLoader] = useState(true);
  const [forecast, setForecast] = useState();
  const getCoordinates = async () => {
    return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  };
  const getData = async (lat, lang) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lang}&appid=20df6ed2d3d499f39b1ec55b2f5a7406&units=metric`;

    try {
      const result = await axios.get(url);
      setCurrentWeather(result?.data);
      console.log(result.data);
      if (result.data) {
        setLoader(false);
      }
      getClimatePrediction(result?.data?.name);
    } catch (error) {
      console.log("ERROR ====> ", error);
    }
  };
  const getClimatePrediction = (currentCity) => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=1612951226954bf0ada164306232012&q=${currentCity}&days=4&aqi=no&alerts=no`
      )
      .then((res) => {
        console.log(res.data);
        setForecast(res?.data?.forecast);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  getData();
  useEffect(() => {
    getCoordinates()
      .then(async (result) => {
        await getData(result?.coords?.latitude, result?.coords?.longitude);
      })
      .catch((err) => {
        console.log("error from get coordinate ", err);
      });
  }, []);

  const nextDays = () => {
    const days = forecast?.forecastday?.map((item, i) => {
      return (
        <div key={i} className="dayInfo">
          <h4>{item?.date}</h4>
          <img alt="" src={`${item?.day?.condition?.icon}`}></img>
          <p className="p">{`Max ${Math.round(
            item?.day?.maxtemp_c
          )} °C / Min ${Math.round(item?.day?.mintemp_c)} °C `}</p>
        </div>
      );
    });
    return days;
  };

  return (
    <>
      {
        <div id="main-screen-con">
          <div id="all-info-con">
            <div id="current-weather-con">
              <h2>current Weather</h2>
              <div id="current-location-image-con">
                <section id="temp-location">
                  <h1 className="h1">{currentWeather?.sys.country}</h1>
                  <h1 className="h1">{currentWeather?.name}</h1>
                  <h1 className="h1">{`${Math.round(
                    currentWeather?.main?.temp
                  )}°C`}</h1>
                </section>
                <div>
                  {
                    <img
                      alt="F"
                      id="c-w-img"
                      src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@4x.png`}
                    />
                  }
                </div>
              </div>

              <div id="rest-info-con">
                <dvi id="m-m-h-con">
                  <section id="max">
                    <FaTemperatureArrowUp size={30} color="red" />{" "}
                    <h3>{`${Math.round(currentWeather?.main?.temp_max)}°C`}</h3>
                  </section>
                  <section id="min">
                    <FaTemperatureArrowDown size={30} color="#4d7db6" />{" "}
                    <h3>{`${Math.round(currentWeather?.main?.temp_min)}°C`}</h3>
                  </section>
                  <section id="humidity">
                    <WiHumidity size={30} />{" "}
                    <h3>{`${Math.round(currentWeather?.main?.temp_max)} %`}</h3>
                  </section>
                </dvi>
                <dvi id="w-p-des-con">
                  <section id="w-speed">
                    <WiStrongWind size={30} color="red" />{" "}
                    <h3>{`${Math.round(currentWeather?.wind?.speed)} km/h`}</h3>
                  </section>
                  <section id="pusher">
                    <WiBarometer size={30} color="#4d7db6" />{" "}
                    <h3>{`${Math.round(
                      currentWeather?.main?.pressure
                    )} hPa`}</h3>
                  </section>
                  <section id="w-des">
                    <MdOutlineDescription size={30} />{" "}
                    <h3>{currentWeather?.weather[0]?.description}</h3>
                  </section>
                </dvi>
              </div>
            </div>
            <div id="forecast-con">
              <h3>Forecast next Days</h3>
              {nextDays()}
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Weather;
