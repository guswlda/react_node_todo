const database = require('../database/database'); // database 모듈 불러오기

// params = parameters 메소드의 별칭
// result 변수에 database.query를 보낸다 ($1, [userId] SQL injection 보안 이슈)
// get 방식 : URL을 통해 내용을 DB에서 내용을 가져옴

exports.getTasks = async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await database.query(
      'SELECT * FROM task WHERE userId = $1 ORDER BY created_at DESC',
      [userId]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: 'Get Items Fail' + error });
  }
};
