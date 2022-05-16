const connection = require("../app/database");
class LabelSerive {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?)`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name =?`;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
  async getLabels(limit, offset) {
    const statement = `SELECT * FROM label LIMIT ? , ?`;
    console.log(limit, offset);
    const [result] = await connection.execute(statement, [offset, limit]);
    return result;
  }
}
module.exports = new LabelSerive();
