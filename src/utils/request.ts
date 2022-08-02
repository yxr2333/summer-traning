import axios from 'axios';

const service = axios.create({
  timeout: 5000,
  baseURL: '/mock/api',
});

export default service;
