import React, { useState } from 'react'

import './WeatherApp.css'

import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import { clear } from '@testing-library/user-event/dist/clear'

export const WeatherApp = () => {

    let api_key = "c84308a93b17784da6e322a471d7063b";

    const [wicon,setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.querySelector(".cityInput");
        if (element.value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=metric&appid=${api_key}`;
    
        let response = await fetch(url);
        let data = await response.json();
    
        const humidity = document.querySelector(".humidity-percentage");
        const wind = document.querySelector(".wind-speed");
        const temperature = document.querySelector(".weather-temp");
        const location = document.querySelector(".weather-location");
    
        humidity.innerHTML = data.main.humidity + " %";
        wind.innerHTML = data.wind.speed + " km/h"; 
        temperature.innerHTML = data.main.temp + "°c";
        location.innerHTML = data.name;

        if (data.weather.icon === "01d" || data.weather.icon == "01n"){
            setWicon(clear_icon);
        } else if (data.weather[0].icon === "02d" || data.weather[0].icon == "02n"){
            setWicon(cloud_icon);
        } else if (data.weather[0].icon === "03d" || data.weather[0].icon == "03n"){
            setWicon(drizzle_icon);
        } else if (data.weather[0].icon === "04d" || data.weather[0].icon == "04n"){
            setWicon(drizzle_icon);
        } else if (data.weather[0].icon === "09d" || data.weather[0].icon == "09n"){
            setWicon(rain_icon);
        } else if (data.weather[0].icon === "10d" || data.weather[0].icon == "10n"){
            setWicon(rain_icon);
        } else if (data.weather[0].icon === "13d" || data.weather[0].icon == "13n"){
            setWicon(snow_icon);
        } else {
            setWicon(clear_icon);
        }

    };
    

  return (
    <div className="container">
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder="Search" /> 
            <div className="search-icon">
                <img src={search_icon} alt="" onClick = {() => {search()}}/>
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="" className="" />
        </div>
        <div className="weather-temp">
            24°c
        </div>
        <div className="weather-location">
            City
        </div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="" className="icon" />
                <div className="data">
                    <div className="humidity-percentage">  %
                    </div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="" className="icon" />
                <div className="data">
                    <div className="wind-speed">   km/h
                    </div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}
