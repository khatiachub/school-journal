import axios from "axios";



const BASE_URL = "http://localhost:5002";
export const publicRequest = axios.create({
    baseURL: BASE_URL
  });