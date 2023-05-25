import axios from 'axios';

const baseURL = '/api/persons';

const getAll = () => {
    const response = axios.get(baseURL);
    return response.then((res) => res.data);
}

const create = (newPerson) => {
    const response = axios.post(baseURL, newPerson);
    return response.then((res) => res.data);
}

const remove = (id) => {
    const response = axios.delete(`${baseURL}/${id}`);
    return response.then((res) => res.data);
}

const update = (id, newPerson) => {
    const response = axios.put(`${baseURL}/${id}`, newPerson);
    return response.then((res) => {console.log(res.data) 
                                    return res.data});
}

export default { getAll, create, remove, update };