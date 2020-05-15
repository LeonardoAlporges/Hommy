import axios from 'axios';

const api = axios.create({
  baseURL: 'http://hommyapplication-com.umbler.net',
});

export default api;
