const serivce = require("../serivce/label.service");
const verfiyLabelEXISTS = async (ctx, next) => {
  // 1.取出要添加的所有标签
  const { labels } = ctx.request.body;
  // 2.判断每一个标签在label表中是否存在
  const newLabels = [];
  for (let name of labels) {
    const LabelResult = await serivce.getLabelByName(name);
    const label = { name };
    if (!LabelResult) {
      // 创建标签
      const result = await serivce.create(name);
      label.id = result.insertId;
    } else {
      label.id = LabelResult.id;
    }
    newLabels.push(label);
  }
  ctx.labels = newLabels;
  await next();
};
module.exports = {
  verfiyLabelEXISTS,
};
