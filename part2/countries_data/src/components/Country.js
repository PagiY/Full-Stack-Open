import { useState, useEffect } from 'react';
import weatherService from '../services/weather';

const Country = ({country}) => {
    
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        weatherService
            .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
            .then((data) => {
                console.log(data);
                setWeather(data)
            })
    }, [])

    if(weather === null){
        return;
    }

    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h2>Languages</h2>
            <ul>
            {
                Object.keys(country.languages).map((key, lang) => <li key = {key}>{country.languages[key]}</li>)
            }
            </ul>
            <img src = {country.flags.png} alt = {country.flags.alt}/>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature: {weather.main.temp} degrees Celsius</p>
            <img src = {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt = {weather.weather[0].description}/>
            <p>Wind: {weather.wind.speed}</p>
        </>
    )
}

export default Country;