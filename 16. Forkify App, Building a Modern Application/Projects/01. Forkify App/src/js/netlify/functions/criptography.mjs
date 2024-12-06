import crypto from "crypto";

export async function criptography(event) {
  try {
    const validApiKey = process.env.SECRET_API_KEY;

    const requestApiKey = event.headers[`accessKey`];
    if (requestApiKey !== validApiKey) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: `Forbidden: Invalid API Key` }),
      };
    }

    if (event.httpMethod !== `POST`) {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: `Method Not Allowed` }),
      };
    }

    const { action, text } = JSON.parse(event.body);

    if (!action || !text || !text.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Action and text are required` }),
      };
    }

    if (action !== `encrypt` && action !== `decrypt`) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Invalid action. Must be 'encrypt' or 'decrypt'` }),
      };
    }

    const algorithm = `aes-256-cbc`;
    const secretKey = Buffer.from(process.env.ENCRYPTION_KEY, `hex`);
    const iv = Buffer.from(process.env.ENCRYPTION_IV, `hex`);

    function encrypt(text) {
      const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
      let encrypted = cipher.update(text, `utf8`, `hex`);
      encrypted += cipher.final(`hex`);
      return encrypted;
    }

    function decrypt(text) {
      const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
      let decrypted = decipher.update(text, `hex`, `utf8`);
      decrypted += decipher.final(`utf8`);
      return decrypted;
    }

    let result;
    if (action === `encrypt`) result = encrypt(text);
    else if (action === `decrypt`) result = decrypt(text);

    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message, stack: err.stack }),
    };
  }
}

export { criptography as handler };
