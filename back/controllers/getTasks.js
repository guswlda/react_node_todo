const database = require('../database/database');

// params = parameters 메소드의 별칭
// result 변수에 database.query를 보낸다 ($1, [userId] SQL injection 보안 이슈)

exports.getTasks = async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await database.query(
      'SELECT * FROM task WHERE userId = $1',
      [userId]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: 'Get Items Fail' + error });
  }
};
