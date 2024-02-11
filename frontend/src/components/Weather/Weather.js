/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react'
import axios from 'axios';
 

function Weather() {
  const getCoordinates = async () => {
    return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  }
  return (
    <div>Weather</div>
  )
}

export default Weather