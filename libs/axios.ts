import axios from 'axios';

export default axios.create({
  baseURL: 'https://localhost:3000/api',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  },
  withCredentials: true,
});
