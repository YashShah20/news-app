import axios from "axios";

const isImage = async (url) => {
  try {
    const headers = (await axios(url, { method: "HEAD" })).data;
    const contentType = headers.get("content-type");
    return contentType.startsWith("image/");
  } catch (error) {
    return true;
  }
};

export { isImage };
