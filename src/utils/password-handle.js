const crypto = require("crypto");
const md5password = (password) => {
  const md5 = crypto.createHash("md5");
  const request = md5.update(password).digest("hex");
  return request;
};

module.exports = { md5password };
