import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.27.176.1:3333/',//Emulador
  //baseURL:'http://10.0.0.119:3333',//Celular IPV4
  //baseURL: 'http://hommyapplication-com.umbler.net',
});

export default api;
