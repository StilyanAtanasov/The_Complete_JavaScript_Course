import { API_URL } from "../../config/config";
import { request } from "../../utils/utils.js";

async function publishRecipe(event) {
  if (event.httpMethod !== `POST`) {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: `Method Not Allowed` }),
    };
  }

  try {
    const API_KEY = process.env.API_KEY;

    const recipe = event.body;
    if (!recipe) throw new Error(`Invalid recipe data`);

    const data = await request(`${API_URL}?key=${API_KEY}`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
      },
      body: recipe,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully published recipe!`,
        data: {
          cookingTime: data.data.recipe.cooking_time,
          id: data.data.recipe.id,
          imageUrl: data.data.recipe.image_url,
          ingredients: data.data.recipe.ingredients,
          publisher: data.data.recipe.publisher,
          servings: data.data.recipe.servings,
          sourceUrl: data.data.recipe.source_url,
          title: data.data.recipe.title,
        },
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

export { publishRecipe as handler };
