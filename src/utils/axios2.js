import axios from 'axios';
import { NODEAPI } from './utils';

const nodeAPI = axios.create({
  baseURL: NODEAPI,
});

nodeAPI.interceptors.request.use((config) => {
  config.headers.post['Content-Type'] = 'application/json';
  return config;
});

export default nodeAPI;
