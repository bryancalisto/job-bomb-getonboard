const axios = require('axios');
const api = axios.create({
  url: 'https://sandbox.getonbrd.dev'
});
const FILE = 'controller.js';

const serverLog = (file, msg) => {
  console.log(`${(new Date().toLocaleDateString())} ${file}: ${msg}`);
}

/*
TODO:
- Poll professional offers every 10 seconds and send the results to the frontend. 
  This will be displayed in the venue's screen.
*/

const PROFESSIONAL_API_KEY = process.env.PROFESSIONAL_API_KEY;

const getJobOffers = async () => {
  try {
    // URL JUST FOR DEBUGGING
    const result = await api.get(' https://sandbox.getonbrd.dev/api/v0/processes?per_page=2&page=1&api_key=LcoGvQmqeJgl36Rub3b89AaFfjm8XBH113Z7MdAlU1FL&expand=["job", "phases"]');
    return result.data.data;
  } catch (e) {
    serverLog(FILE, e);
    throw e;
  }
}

module.exports = {
  getJobOffers
}