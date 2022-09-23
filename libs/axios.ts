import axios from 'axios';

export default axios.create({
  baseURL: 'https://mi-webauthn-server.vercel.app',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': 'https://mi-webauthn.vercel.app',
    'Access-Control-Allow-Credentials': 'true',
  },
  withCredentials: true,
});
