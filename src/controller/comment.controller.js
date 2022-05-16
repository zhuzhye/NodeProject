const commentService = require("../serivce/comment.service");
class commentController {
  async create(ctx) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;
    const result = await commentService.create(id, content, momentId);
    ctx.body = result;
  }
  async reply(ctx) {
    console.log(ctx.params);
    const { momentId, content } = ctx.request.body;
    const commentId = ctx.params.id;
    const { id } = ctx.user;
    const result = await commentService.reply(id, content, momentId, commentId);
    ctx.body = result;
  }
  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await commentService.update(commentId, content);
    ctx.body = result;
  }
  async reomve(ctx, next) {
    const { commentId } = ctx.params;
    const result = await commentService.remove(commentId);
    ctx.body = result;
  }
  async list(ctx, next) {
    const { momentId } = ctx.query;
    const result = await commentService.getCommentById(momentId);
    ctx.body = result;
  }
}

module.exports = new commentController();
