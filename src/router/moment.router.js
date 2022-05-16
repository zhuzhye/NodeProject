const Router = require("koa-router");
const momentRouter = new Router({ prefix: "/moment" });
const { verifyAuth, verfiyPermission } = require("../middleware/auth.middleware");
const { create, detail, list, update, remove, addLabels, fileInfo } = require("../controller/moment.controller");
const { verfiyLabelEXISTS } = require("../middleware/label.middleware");
momentRouter.post("/", verifyAuth, create);
momentRouter.get("/", list);
momentRouter.get("/:momentId", detail);
momentRouter.patch("/:momentId", verifyAuth, verfiyPermission, update);
momentRouter.delete("/:momentId", verifyAuth, verfiyPermission, remove);
//给动态添加标签
momentRouter.post("/:momentId/labels", verifyAuth, verfiyPermission, verfiyLabelEXISTS, addLabels);
//动态配图
momentRouter.get("/images/:filename", fileInfo);
module.exports = momentRouter;
