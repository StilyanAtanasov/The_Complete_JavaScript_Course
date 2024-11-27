import { API_URL } from "../../config/config.js";
import { request } from "../../utils/utils.js";

async function searchRecipes(event) {
  if (event.httpMethod !== `POST`) {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: `Method Not Allowed` }),
    };
  }

  try {
    const API_KEY = process.env.API_KEY;
    if (!API_KEY) throw new Error(`Error getting results`);

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
      body: JSON.stringify({ message: err.message, stack: err.stack, response }),
    };
  }
}

export { searchRecipes as handler };
