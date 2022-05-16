const service = require("../serivce/user.service");
const fileService = require("../serivce/file.service");
const { AVATAR_PATH } = require("../contstants/file-path");
const fs = require("fs");
class UserController {
  async create(ctx, next) {
    //获取用户请求传递参数
    const user = ctx.request.body;
    console.log(user);
    //查询数据
    const result = await service.create(user);
    //返回数据
    ctx.body = result;
  }
  async avatarInfo(ctx, next) {
    const { userId } = ctx.params;
    const avatarInfo = await fileService.getAvatarByUserId(userId);
    ctx.response.set("content-type", avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();
