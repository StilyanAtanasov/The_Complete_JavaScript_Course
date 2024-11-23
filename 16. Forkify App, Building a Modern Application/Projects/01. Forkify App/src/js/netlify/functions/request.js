const { timeout } = require("../../utils/utils");

module.exports.request = async function (url, options = {}) {
  const response = await Promise.race([fetch(url, options), timeout(5000, `Search request took too long!`)]);
  if (!response.ok) throw new Error(`API call failed with status ${response.status}`);
  return await response.json();
};
