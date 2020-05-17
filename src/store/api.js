import axios from 'axios';

const apiUrl = process.env.VUE_APP_BACKEND_ADDRESS;

export default () => axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  Accept: 'application/json',
  headers: {
    'Content-Type': 'application/json',
  },
});
