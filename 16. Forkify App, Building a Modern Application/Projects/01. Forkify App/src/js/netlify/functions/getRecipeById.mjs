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
    const id = JSON.parse(event.body).id;
    if (!id) throw new Error(`Invalid recpice id!`);

    const data = await request(`${API_URL}/${id}`);

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
}

export { getRecipeById as handler };
