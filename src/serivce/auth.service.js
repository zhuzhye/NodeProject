const connection = require("../app/database.js");
class AuthService {
  async checkResource(tableName, id, userId) {
    const statment = `SELECT * FROM ${tableName} WHERE id=? AND  user_id=?`;
    const [result] = await connection.execute(statment, [id, userId]);
    return result;
  }
}

module.exports = new AuthService();
