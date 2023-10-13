const fetch = require("node-fetch");

const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

module.exports = {
  async getLocationFromIP(ip = "202.131.111.147") {
    try {
      const result = await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`);

      const data = await result.json();
      const city = data.city;

      const country = data.country;
      return { city, country };
    } catch (error) {
      throw error;
    }
  },
};
