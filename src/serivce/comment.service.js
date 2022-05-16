const connection = require("../app/database");
class commentService {
  async create(userid, content, momentId) {
    const statement = `INSERT INTO comment (user_id,content,moment_id) VALUES (?,?,?)`;
    const [result] = await connection.execute(statement, [userid, content, momentId]);
    return result;
  }
  async reply(userid, content, momentId, commentId) {
    const statement = `INSERT INTO comment (user_id,content,moment_id,comment_id) VALUES (?,?,?,?)`;
    const [result] = await connection.execute(statement, [userid, content, momentId, commentId]);
    return result;
  }
  async update(commentId, content) {
    const statement = `UPDATE comment SET content=? WHERE id =?`;
    const [result] = await connection.execute(statement, [content, commentId]);
    return result;
  }
  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id =?`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }
  async getCommentById(momentId) {
    const statement = `SELECT 
    cm.id,
    cm.content,
    cm.comment_id commentId,
    cm.createAt createTime,
    JSON_OBJECT('id',u.id,'name',u.name) userInfo
    FROM comment cm
    LEFT JOIN users u ON u.id =cm.user_id
    WHERE moment_id=?
    `;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
}
module.exports = new commentService();
