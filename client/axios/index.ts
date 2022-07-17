import axios from 'axios'

export const useAxios = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
})
