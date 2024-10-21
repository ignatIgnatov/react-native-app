import axios from "axios";

export const API_URL = "http://192.168.0.50:8082";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
