// npm install dotenv
// 讲env加载到环境变量
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
dotenv.config();
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/private.key"));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"));
module.exports = { MYSQL_HOST, MYSQL_POST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, APP_PORT, APP_HOST } = process.env;
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
