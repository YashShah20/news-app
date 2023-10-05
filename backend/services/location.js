const fetch = require("node-fetch");

const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

module.exports = {
  async getLocationFromIP(ip = "202.131.111.147") {
    try {
      const result = await fetch(
        `http://api.ipstack.com/${ip}?access_key=${IPSTACK_API_KEY}`
      );

      const data = await result.json();
      const city = data.city;

      const country = data.country_name;
      return { city, country };
    } catch (error) {
      throw error;
    }
  },
};
