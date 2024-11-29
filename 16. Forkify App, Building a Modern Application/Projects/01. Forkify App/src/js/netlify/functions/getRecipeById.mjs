import { API_URL } from "../../config/config.js";
import { request } from "../../utils/utils.js";

async function getRecipeById(event) {
  if (event.httpMethod !== `POST`) {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: `Method Not Allowed` }),
    };
  }

  try {
    const recipeId = JSON.parse(event.body).id;
    if (!recipeId) throw new Error(`Invalid recpice id!`);

    const data = await request(`${API_URL}/${recipeId}`);

    const { title, id, image_url, cooking_time, servings, ingredients, publisher, source_url, key } = data.data.recipe;
    const filtered = {
      title,
      id,
      imageUrl: image_url,
      cookingTime: cooking_time,
      servings,
      ingredients,
      publisher,
      sourceUrl: source_url,
      custom: key ? true : false,
    };

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
      statusText: err.message,
      body: JSON.stringify({ message: err.message }),
    };
  }
}

export { getRecipeById as handler };
