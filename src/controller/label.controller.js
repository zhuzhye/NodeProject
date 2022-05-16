const service = require("../serivce/label.service");
class LabelContronller {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const result = await service.create(name);
    ctx.body = result;
  }
  async list(ctx, next) {
    const { limit, offset } = ctx.query;
    const result = await service.getLabels(limit, offset);
    ctx.body = result;
  }
}
module.exports = new LabelContronller();
