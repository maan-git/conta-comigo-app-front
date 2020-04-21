import axios from 'axios';

// const apiUrl = 'https://reqres.in/api/';
// const apiUrl = 'https://conta-comigo-ap.herokuapp.com/';
const apiUrl = 'http://www.helpmecorona.com/';

export default () => axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  Accept: 'application/json',
  headers: {
    'Content-Type': 'application/json',
  },
});
