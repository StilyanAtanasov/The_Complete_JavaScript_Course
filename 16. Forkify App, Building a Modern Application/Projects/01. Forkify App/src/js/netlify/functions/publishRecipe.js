const { API_URL } = require("../../config/config");

module.exports.handler = async function (event) {
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

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
      },
      body: recipe,
    });

    if (!response.ok) throw new Error(`Failed to upload recipe!`);
    const data = await response.json();

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
};
