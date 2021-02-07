import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://10.0.1.3:3333',
  baseURL: 'http://hommyapplication-com.umbler.net',
});

export default api;
