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
    const id = event.body.id;
    if (!id) throw new Error(`Invalid query`);

    const data = await request(`${API_URL}?${id}`);

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
