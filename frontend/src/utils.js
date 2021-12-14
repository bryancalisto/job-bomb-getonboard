import axios from "axios";
const BASE_URL = "https://sandbox.getonbrd.dev";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  // headers: {
  //   authorization: PROFESSIONAL_ACCESS_TOKEN
  // }
});
export default api;
