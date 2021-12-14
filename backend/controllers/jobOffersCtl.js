const { serverLog, api } = require('../utils');
const FILE = 'jobOffersCtl.js';

const getJobOffers = async () => {
  try {
    const result = await api.get('/api/v0/matching_jobs?page=1');
    return result.data.data;
  } catch (e) {
    serverLog(FILE, 'getJobOffers: ' + e);
    return null;
  }
}

module.exports = {
  getJobOffers
}