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
    if (!recipeId) throw new Error(`Invalid recipe id!`);

    const { result: realId } = await request(`${process.env.URL}/.netlify/functions/criptography`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
        accessKey: process.env.FUNCTIONS_KEY,
      },
      body: JSON.stringify({ action: `decrypt`, text: recipeId }),
    });

    const data = await request(`${API_URL}/${realId}`);

    const { title, image_url, cooking_time, servings, ingredients, publisher, source_url, key } = data.data.recipe;
    const ingredientsOnly = ingredients.filter(i => !i.description.includes(`**directions**`));
    const directions = ingredients.find(i => i.description.includes(`**directions**`))?.description.replaceAll(`**directions**`, ``);
    const filtered = {
      title: title.replaceAll(`**verified**`, ``),
      id: recipeId,
      imageUrl: image_url,
      cookingTime: cooking_time,
      servings,
      ingredients: ingredientsOnly,
      publisher,
      sourceUrl: source_url,
      verified: title.includes(`**verified**`) ? true : key ? false : true,
      directions: directions || null,
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
