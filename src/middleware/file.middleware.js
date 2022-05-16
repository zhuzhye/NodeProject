// npm i koa-multer
const { AVATAR_PATH, PICURE_PATH } = require("../contstants/file-path");
const Multer = require("koa-multer");
const path = require("path");
const Jimp = require("jimp");
// 头像上传
const storage_avatar = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATAR_PATH);
  },
  filename: (req, res, cb) => {
    cb(null, Date.now() + path.extname(res.originalname));
  },
});
const avatarUpload = Multer({
  storage: storage_avatar,
});
const avatarHandler = avatarUpload.single("avatar");
//图片上传
const storage_picture = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PICURE_PATH);
  },
  filename: (req, res, cb) => {
    cb(null, Date.now() + path.extname(res.originalname));
  },
});
const pictureUpload = Multer({
  storage: storage_picture,
});

// 图片处理
const pictureResize = async (ctx, next) => {
  // 1.获取图片的图像信息
  const files = ctx.req.files;
  // 2.对图像进行处理 (sharp,jimp)
  for (let file of files) {
    let splitFile = file.filename.split(".");
    const destPath = path.join(file.destination, splitFile[0]);
    console.log(destPath, "destPath");
    Jimp.read(file.path).then((image) => {
      image.resize(1280, Jimp.AUTO).write(`${destPath}-large.${splitFile[1]}`);
      image.resize(640, Jimp.AUTO).write(`${destPath}-middle.${splitFile[1]}`);
      image.resize(320, Jimp.AUTO).write(`${destPath}-small.${splitFile[1]}`);
    });
  }
  await next();
};
const pictureHandler = pictureUpload.array("picture", 9);
module.exports = { avatarHandler, pictureHandler, pictureResize };
