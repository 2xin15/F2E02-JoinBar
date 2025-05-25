import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // 根據後端設定待調整
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;