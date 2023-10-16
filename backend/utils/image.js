const fetch = require("node-fetch");

const isImage = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type");
    const isValidImage = contentType.startsWith("image/");
    if (!isValidImage) {
      return Promise.reject("URL is not a valid image");
    }
    return Promise.resolve("valid image URL");
  } catch (error) {
    console.dir(error);
    return Promise.reject("URL is not a valid image");
  }
};

module.exports = { isImage };
