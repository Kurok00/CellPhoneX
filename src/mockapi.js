// src/api.js
import axios from 'axios';

const API_URL = 'https://66c6b6d58b2c10445bc77345.mockapi.io/user';

export const signup = async (email, password) => {
  const response = await axios.post(API_URL, {
    email,
    password,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.get(API_URL);
  const users = response.data;

  // Kiểm tra xem người dùng có tồn tại không
  const user = users.find(user => user.email === email && user.password === password);
  return user || null;
};