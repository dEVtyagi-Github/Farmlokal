const axios = require('axios');
const { retry } = require('../utils/retry');

exports.fetchExternalData = async () => {
  return retry(async () => {
    const response = await axios.get('https://external-api.com/data', {
      timeout: 2000
    });
    return response.data;
  });
};
