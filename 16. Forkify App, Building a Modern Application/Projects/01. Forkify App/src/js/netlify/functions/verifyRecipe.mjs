import { API_URL } from "../../config/config.js";
import { request } from "../../utils/utils.js";

async function verifyRecipe(event) {
  if (event.httpMethod !== `POST`) {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: `Method Not Allowed` }),
    };
  }

  try {
    const recipe = JSON.parse(event.body);
    const id = recipe?.id;
    const title = recipe?.title;
    if (!recipe || !id || !title) throw new Error(`Invalid recipe!`);

    const API_KEY = process.env.API_KEY;

    await request(`${API_URL}/${id}?key=${API_KEY}`, { method: `DELETE` });

    recipe.title = `${title} **verified**`;

    await request(`${API_URL}?key=${API_KEY}`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(recipe),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Recipe with id: ${id} verified successfully!`,
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

export { verifyRecipe as handler };
