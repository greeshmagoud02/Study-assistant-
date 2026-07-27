import axios from "axios";
import { REQUEST_TIMEOUT_MS } from "../constants";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiClient = axios.create({
  baseURL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});
