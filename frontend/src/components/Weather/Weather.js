/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import axios from "axios";

function Weather() {
  const getCoordinates = async () => {
    return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  };
  const getData = async (lat, lang) => {
 
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lang}&appid=20df6ed2d3d499f39b1ec55b2f5a7406&units=metric`
 
    try {

      const result = await axios.get(url)
      console.log(result.data);
      
       
    
    } catch (error) {
      console.log("ERROR ====> ", error);
    }

  }
  getData()
  useEffect(() => {
    getCoordinates();
  }, []);
  return <div>Weather</div>;
}

export default Weather;
