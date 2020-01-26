import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "https://apimymovies.herokuapp.com"
});

export const themoviedbapi = axios.create({
    baseURL:"https://api.themoviedb.org/4/"
})
themoviedbapi.interceptors.request.use(async config => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTBlNWE2MDRkNDNmMDI1ZmQ3MTc0ODVlMDlkNjE4NiIsInN1YiI6IjVlMjljNTc3OTYzODY0MDAxM2FjNmYzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.knX2lBiwJ2waYTIg2lUhxCNkRWD-8rxFjE1gPU2f0wU'
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});
api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;