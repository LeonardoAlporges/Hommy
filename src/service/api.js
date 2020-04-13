import axios from 'axios';

const api = axios.create({
  baseURL:'https://backendhommy.herokuapp.com',
});

export default api;