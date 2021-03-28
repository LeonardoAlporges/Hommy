import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.32.2:3333',
  //baseURL: 'http://hommyapplication-com.umbler.net',
});

export default api;
