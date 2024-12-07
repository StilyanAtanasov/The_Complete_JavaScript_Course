import { API_URL } from "../../config/config.js";
import { request } from "../../utils/utils.js";

async function deleteRecipe(event) {
  if (event.httpMethod !== `POST`) {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: `Method Not Allowed` }),
    };
  }

  try {
    const id = JSON.parse(event.body).id;
    if (!id) throw new Error(`Invalid recipe!`);

    const API_KEY = process.env.API_KEY;

    const { result: realId } = await request(`${process.env.URL}/.netlify/functions/criptography`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
        accessKey: process.env.FUNCTIONS_KEY,
      },
      body: JSON.stringify({ action: `decrypt`, text: id }),
    });

    await request(`${API_URL}/${realId}?key=${API_KEY}`, { method: `DELETE` }, false);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Recipe deleted successfully!`,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      statusText: err.message,
      body: JSON.stringify({ message: err.message }),
    };
  }
}

export { deleteRecipe as handler };
