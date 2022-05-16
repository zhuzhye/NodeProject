const connection = require("../app/database");
const sqlFragment = `SELECT m.id id,m.content content,m.createAt createTime,m.updateAt updateTime ,JSON_OBJECT('id',u.id,'name',u.name) author
FROM moment m LEFT JOIN users u ON m.user_id = u.id`;
class momentService {
  async create(user_id, content) {
    const statement = `INSERT INTO moment (user_id,content) VALUES (?,?)`;
    const [result] = await connection.execute(statement, [user_id, content]);
    return result;
  }

  async getMomentById(id) {
    const statement = `
    SELECT m.id id,
    m.content content,
    m.createAt createTime,
    m.updateAt updateTime ,
    JSON_OBJECT('id',u.id,'name',u.name,'avatarURL',u.avatar_url) author,
    JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)) labels,
    ((SELECT 
    IF(COUNT(l.id),
    JSON_ARRAYAGG(
    JSON_OBJECT(
    'id',c.id,
    'content',c.content,
    'commentId',c.comment_id,
    'createTime',c.createAt,
    'user',JSON_OBJECT('id',cu.id,'name',cu.name,'avatarURL',cu.avatar_url)
     )),NULL)
     FROM comment c 
     LEFT JOIN users cu 
     ON c.user_id=cu.id 
     WHERE m.id=c.moment_id)) comments,
     (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:9999/moment/images/',file.filename)) FROM file WHERE m.id=file.moment_id ) images
    FROM moment m 
    LEFT JOIN users u ON m.user_id = u.id
    LEFT JOIN comment c ON c.moment_id= m.id
    LEFT JOIN users cu ON c.user_id= cu.id
    LEFT JOIN moment_label ml on m.id= ml.moment_id
    LEFT JOIN label l ON ml.label_id = l.id
    WHERE m.id=7 
    GROUP BY m.id
    `;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
  async getMomentlist(current, page) {
    current = Number(current - 1) * 10;
    // const statement = `${sqlFragment} LIMIT ?,?`;
    const statement = ` 
    SELECT m.id id,
    m.content content,m.createAt createTime,
    m.updateAt updateTime ,JSON_OBJECT('id',u.id,'name',u.name )author,
    (SELECT COUNT(*) FROM comment c WHERE c.moment_id=m.id) commentcount,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:9999/moment/images/',file.filename)) FROM file WHERE m.id=file.moment_id ) images,
    (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id=m.id) labelcount
    FROM moment m LEFT JOIN users u ON m.user_id = u.id  LIMIT ?,?`;
    const [result] = await connection.execute(statement, [current.toString(), page]);
    return result;
  }
  async update(content, id) {
    const statement = `UPDATE moment SET content=? WHERE id=?`;
    const [result] = await connection.execute(statement, [content, id]);
    return result;
  }
  async remove(id) {
    const statement = `DELETE FROM moment WHERE id=? `;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id=? AND label_id=?`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result[0] ? true : false;
  }
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES (?,?)`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new momentService();
