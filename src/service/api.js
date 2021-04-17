import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://192.168.32.2:3333',//Emulador
  baseURL:'http://192.168.0.101:3333',//Celular IPV4
  //baseURL: 'http://hommyapplication-com.umbler.net',
});

export default api;
