import axios from 'axios';

export const HTTP = axios.create({

    // baseURL: process.env.ROOT_API,
    baseURL: process.env.REACT_APP_API_BASE_URL,

    // development url
    // baseURL: process.env.REACT_APP_API_BASE_URL_DEV,

    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': process.env.REACT_APP_API_KEY,
    },
});
