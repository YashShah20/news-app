const axios = require("axios");

const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

module.exports = {
  async getLocationFromIP(ip = "202.131.111.147") {
    try {
      const result = await axios.get(
        `http://api.ipstack.com/${ip}?access_key=${IPSTACK_API_KEY}`
      );

      const city = result.data.city;
      const country = result.data.country_name;
      return { city, country };
    } catch (error) {
      throw error;
    }
  },
};
