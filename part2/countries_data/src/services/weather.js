import axios from 'axios';

const getWeather = (lat, lon) => {
    const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
    return response.then((res) => res.data);
}

export default { getWeather };