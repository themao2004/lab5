import axios from 'axios';

const api = axios.create({
  baseURL: 'https://student-api-nestjs.onrender.com',
});

export default api;