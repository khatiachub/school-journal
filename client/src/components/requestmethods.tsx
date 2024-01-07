import axios from "axios";
import { useUser } from "./UserContext";



const token=localStorage.getItem('token')
const user=localStorage.getItem('user')

const TOKEN = token?.replace(/^"(.*)"$/, '$1');


console.log(TOKEN);


const BASE_URL = "https://school-journal-fve9dem5r-my-team-080e3cf2.vercel.app/";
export const publicRequest = axios.create({
    baseURL: BASE_URL
  });

  export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` ,
    "Content-Type": 'application/json',
    Accept:"application/json",
  },
  });