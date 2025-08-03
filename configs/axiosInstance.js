import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/configs/authOptions';
import jwt from 'jsonwebtoken';

async function generateToken() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const token = jwt.sign(session.user, process.env.BE_FE_SECRET);
  return token;
}

const axiosInstance = axios.create({
  baseURL: process.env.BE_HOST,
  // timeout: 2000,
  headers: {
    'X-CM-API-KEY': process.env.API_KEY,
  },
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const token = await generateToken();
    config.headers['X-CM-AUTHORIZATION-TOKEN'] = token || '';
    return config;
  },
  function (error) {
    console.log('Token generation failed: ', error);
    // return Promise.reject(error);
    return config;
  }
);

export default axiosInstance;
