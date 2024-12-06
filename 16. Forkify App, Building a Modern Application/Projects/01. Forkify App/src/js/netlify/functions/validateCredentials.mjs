async function validateCredentials(event) {
  if (event.httpMethod !== `POST`) {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: `Method Not Allowed` }),
    };
  }

  try {
    const password = JSON.parse(event.body).password;
    if (!password) throw new Error(`Invalid credentials!`);

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    if (password !== ADMIN_PASSWORD)
      return {
        statusCode: 200,
        body: JSON.stringify({ valid: false }),
      };

    return {
      statusCode: 200,
      body: JSON.stringify({ valid: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      statusText: err.message,
      body: JSON.stringify({ message: err.message }),
    };
  }
}

export { validateCredentials as handler };
