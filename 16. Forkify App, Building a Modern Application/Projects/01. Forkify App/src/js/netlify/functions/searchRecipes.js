const { API_URL } = require("../../config/config");
const { request } = require("./request");

module.exports.handler = async function (event) {
  if (event.httpMethod !== `POST`) {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: `Method Not Allowed` }),
    };
  }

  try {
    const API_KEY = process.env.API_KEY;

    const searchQuery = JSON.parse(event.body).searchQuery;
    if (!searchQuery) throw new Error(`Invalid query : ${searchQuery}`);

    const data = await request(`${API_URL}?search=${searchQuery}&key=${API_KEY}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Search successful!`,
        data,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      statusText: err.message,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
