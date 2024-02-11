/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import axios from "axios";

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

  return <div>Weather</div>;
}

export default Weather;
