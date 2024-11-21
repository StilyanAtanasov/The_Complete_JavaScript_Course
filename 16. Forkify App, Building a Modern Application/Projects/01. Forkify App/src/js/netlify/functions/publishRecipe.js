// const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  //   const { id } = event.queryStringParameters;

  try {
    // const API_URL = `https://api.example.com/recipes/`;
    const API_KEY = process.env.API_KEY_TEST;

    // const response = await fetch(`${API_URL}/${id}?key=${API_KEY}`);
    // if (!response.ok) throw new Error(`Failed to fetch data`);

    // const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({
        API_KEY,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
