const fileService = require("../serivce/file.service");
const userService = require("../serivce/user.service");
const { APP_HOST, APP_PORT } = require("../app/config");
class FileController {
  async saveAvatarInfo(ctx, next) {
    // 1.获取图像相关信息
    const { mimetype, filename, size } = ctx.req.file;
    const { id } = ctx.user;
    // 2.将信息数据保存到数据库中
    await fileService.createAvatar(filename, mimetype, size, id);
    // 3.将图片地址保存  到user表中
    const avatarURL = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarUrlById(avatarURL, id);
    // 4.返回结果
    ctx.body = "上传成功";
  }
  async savePictureInfo(ctx, next) {
    // 1.获取图像信息
    const files = ctx.req.files;
    const { id } = ctx.user;
    const { momentId } = ctx.req.body;
    for (let file of files) {
      const { filename, mimetype, size } = file;
      await fileService.createFile(filename, mimetype, size, id, momentId);
    }
    ctx.body = "动态上传完成";
    // 2.将所有的文件信息保存到数组中
  }
}
module.exports = new FileController();
