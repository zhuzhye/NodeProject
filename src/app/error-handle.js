const errorTypes = require("../contstants/error-types");
const errorHandle = function (err, ctx) {
  let status, message;
  switch (err.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; //bad request
      message = "用户名或密码不能为空";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409; //conflict
      message = "用户名已存在";
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400;
      message = "用户名不存在";
      break;
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400;
      message = "密码不正确";
      break;
    case errorTypes.UNAUTHORIZATION:
      console.log("222");
      status = 401;
      message = "用户未授权";
      break;
    case errorTypes.UNPREMISSION:
      status = 401;
      message = "未具备操作权限";
      break;
    default: //bad request
      status = 404;
      message = "NOT FOUND";
      break;
  }
  ctx.status = status;
  ctx.body = message;
};
module.exports = errorHandle;
