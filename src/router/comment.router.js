const Router = require("koa-router");
const commentRouter = new Router({ prefix: "/comment" });
const { verifyAuth, verfiyPermission } = require("../middleware/auth.middleware");
const { create, reply, update, reomve, list } = require("../controller/comment.controller");
commentRouter.post("/", verifyAuth, create);
commentRouter.post("/:id/reply", verifyAuth, reply);
//修改评论
commentRouter.patch("/:commentId", verifyAuth, verfiyPermission, update);
//删除评论
commentRouter.delete("/:commentId", verifyAuth, verfiyPermission, reomve);
//获取评论列表
commentRouter.get("/", list);
module.exports = commentRouter;
