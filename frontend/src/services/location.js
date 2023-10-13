import axios from "axios";

const getLocationByIP = async () => {
  const response = await axios.get(`https://get.geojs.io/v1/ip/geo.json`);
  return response.data;
};

export { getLocationByIP };
