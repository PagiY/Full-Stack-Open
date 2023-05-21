import axios from 'axios';

const baseURL = 'https://restcountries.com/v3.1';

const getAll = () => {
    const response = axios.get(`${baseURL}/all`);
    return response.then((res) => res.data);
}

const getOne = (country) => {
    const response = axios.get(`${baseURL}/name/${country}`);
    return response.then((res) => res.data);
}

export default { getAll, getOne };
