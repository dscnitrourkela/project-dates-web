import axios from 'axios';

// Configure and an instance of axios
export const avenueApi = axios.create({
  // baseURL: 'http://localhost:9000',
  baseURL: 'https://avenue-api.nitrkl.in',
  timeout: 60000,
  timeoutErrorMessage: 'Request Timeout: Please try again',
});
