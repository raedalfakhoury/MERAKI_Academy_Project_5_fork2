/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaTemperatureArrowUp, FaTemperatureArrowDown } from "react-icons/fa";

import { MdOutlineDescription } from "react-icons/md";
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import "../Weather/Weather.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function Weather() {
  const [currentWeather, setCurrentWeather] = useState();
  const [loader, setLoader] = useState(true);
  const [forecast, setForecast] = useState();

const dayOfWeek = (date)=>{
  const currentDate = new Date(date);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = days[currentDate.getDay()];
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${dayOfWeek}, ${day}-${month}-${year}`;
  console.log(formattedDate);
return formattedDate  
}

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
  const currentDay = ( )=>{
    const currentDate = new Date( );
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = days[currentDate.getDay()];
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    const formattedDate = `${dayOfWeek}, ${day}-${month}-${year}`;
    console.log(formattedDate);
  return formattedDate 
  }
  const getClimatePrediction = (currentCity) => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=1612951226954bf0ada164306232012
        &q=${currentCity}&days=4&aqi=no&alerts=no`
      )
      .then((res) => {
        setForecast(res?.data); 
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
  // nextDays();
    return (
    // <div
    //   className="mainWeatherScreen"
    //   style={{
    //     backgroundImage: `linear-gradient( rgba(9, 8, 37, 0.4), rgba(0, 15, 80, 0.7)),url(${""})`,
    //     backgroundSize: "cover",
    //     backgroundRepeat: "no-repeat",
    //     backgroundPosition: "center",
    //   }}
    // ></div>
    <>
      <div class="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <h1>{forecast?.location?.country}</h1>
        <h2>{forecast?.location?.name}</h2>
        <div className="tempreture">
          <h3>{forecast?.current?.temp_c} </h3>
          °C
        </div>
        <img id="img"
          alt=""
          src={forecast?.current?.condition?.icon}
        ></img>
        <h3>{forecast?.current?.condition?.text}</h3>
        <div className="reelFeel">
          <h4>Real Feal : {forecast?.current?.feelslike_c}°C</h4>
          <h4>humidity : {forecast?.current?.humidity}°C</h4>
        </div>
<div className="forThreeDays">
  <div className="forOneDay">

  </div>
</div>

        <h4>{currentDay()}</h4>
      </div>
    </>
  );
}

export default Weather;
