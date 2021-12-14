const axios = require('axios');
const createAuthRefreshInterceptor = require('axios-auth-refresh').default;
const BASE_URL = 'https://sandbox.getonbrd.dev';
let PROFESSIONAL_ACCESS_TOKEN;
let PROFESSIONAL_REFRESH_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  // headers: {
  //   authorization: PROFESSIONAL_ACCESS_TOKEN
  // }
});

const axiosForTokenRequest = axios.create();

const refreshToken = async failedRequest => axiosForTokenRequest.post(
  `${BASE_URL}/api/v0/auth_tokens?refresh_token=${PROFESSIONAL_REFRESH_TOKEN}`)
  .then(async resp => {
    if (resp.data.token) {
      PROFESSIONAL_ACCESS_TOKEN = resp.data.token;
      PROFESSIONAL_REFRESH_TOKEN = resp.data.refresh_token;
      failedRequest.response.config.headers['Authorization'] = 'Bearer ' + PROFESSIONAL_ACCESS_TOKEN;
    }

    return Promise.resolve();
  }).catch(e => {
    Promise.reject(e);
  });

createAuthRefreshInterceptor(api, refreshToken);

const serverLog = (file, msg) => {
  const date = new Date();
  console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${file}: ${msg}`);
}

module.exports = {
  serverLog,
  api
}