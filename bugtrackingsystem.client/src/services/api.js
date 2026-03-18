import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7088/api',
    timeout: 100000,
    headers: { 'Content-Type': 'application/json' },
});
export default api;