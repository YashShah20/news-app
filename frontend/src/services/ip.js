import axios from "axios";

const getIp = async () => {
  const response = await axios.get("https://api.country.is/");
  return response.data.ip;
};

export { getIp };
