const Koa = require("koa");
const useRouter = require("../router/index");
const app = new Koa();
const errorHandle = require("./error-handle");
//解析body数据
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());
useRouter(app);
app.on("error", errorHandle);
module.exports = app;
