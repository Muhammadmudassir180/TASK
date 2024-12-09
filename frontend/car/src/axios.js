import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001/car/',  // Your backend URL
});

export default instance;
