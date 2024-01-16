import axios from "axios";



const token=localStorage.getItem('token')
const TOKEN = token?.replace(/^"(.*)"$/, '$1');




const BASE_URL = "http://localhost:5002/";
export const publicRequest = axios.create({
    baseURL: BASE_URL,
    headers:{
      Accept: "application/json, text/plain, */*"
    }
  });

  export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` ,
    "Content-Type": 'application/json',
    Accept:"application/json",
  },
  });