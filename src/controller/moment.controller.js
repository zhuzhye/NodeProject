const fileService = require("../serivce/file.service");
const momentService = require("../serivce/moment.service");
const fs = require("fs");
const { PICURE_PATH } = require("../contstants/file-path");
class MomentController {
  async create(ctx, next) {
    // 1.获取数据(user_id,content,图片)

    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    const result = await momentService.create(userId, content);
    ctx.body = result;
  }
  async detail(ctx, next) {
    // 1.获取数据（moemntId）
    const momentId = ctx.params.momentId;
    // 2.根据id去查询这条数据
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }
  async list(ctx, next) {
    // 1.获取数据(page,current)
    const { page, current } = ctx.query;
    console.log(page, current);
    const result = await momentService.getMomentlist(current, page);
    ctx.body = result;
  }
  async update(ctx, next) {
    //获取参数
    const { content } = ctx.request.body;
    const { momentId } = ctx.params;
    //修改内容
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }
  async remove(ctx, next) {
    //获取参数
    const { momentId } = ctx.params;
    //删除内容
    const result = await momentService.remove(momentId);
    ctx.body = result;
  }
  async addLabels(ctx, next) {
    // 1.获取标签和动态id
    const { labels } = ctx;
    const { momentId } = ctx.params;
    // 2.添加所有的标签
    for (let label of labels) {
      // 2.1判断标签是否已经和标签有关系
      const isExist = await momentService.hasLabel(momentId, label.id);
      if (!isExist) {
        await momentService.addLabel(momentId, label.id);
      }
    }
    ctx.body = "添加标签成功";
  }
  async fileInfo(ctx, next) {
    let { filename } = ctx.params;
    const { type } = ctx.query;
    const types = ["small", "middle", "large"];
    const checkname = filename;
    if (types.some((item) => item == type)) {
      filename = filename.split(".")[0] + "-" + type + "." + filename.split(".")[1];
    }
    const fileInfo = await fileService.getFileByFileName(checkname);
    ctx.response.set("content-type", fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICURE_PATH}/${filename}`);
  }
}
module.exports = new MomentController();
