import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users', // Mock API endpoint
});

export default api;
