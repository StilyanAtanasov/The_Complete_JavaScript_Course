import { API_URL } from "../../config/config.js";
import { request } from "../../utils/utils.js";
import crypto from "crypto";

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

    const filtered = await Promise.all(
      data.data.recipes.map(async ({ id, image_url, key, publisher, title }) => {
        const { result: encryptedId } = await request(`${process.env.URL}/.netlify/functions/criptography`, {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`,
            accessKey: process.env.FUNCTIONS_KEY,
          },
          body: JSON.stringify({ action: `encrypt`, text: id }),
        });

        return {
          id: encryptedId,
          image_url,
          verified: title.includes(`**verified**`) ? true : key ? false : true,
          publisher,
          title: title.replaceAll(`**verified**`, ``),
        };
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Search successful!`,
        data: filtered,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message, stack: err.stack }),
    };
  }
}

export { searchRecipes as handler };
