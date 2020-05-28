import axios from 'axios';


export default () => {
  const apiUrl = process.env.VUE_APP_BACKEND_ADDRESS;
  let auth;
  if (localStorage.getItem('userInfo')) {
    auth = localStorage.getItem('userInfo').replace(/^"(.*)"$/, '$1');
  }
  const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    Accept: 'application/json',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
  });
  return api;
};
