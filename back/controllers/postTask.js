const database = require('../database/database');
const { v4: uuid4 } = require('uuid');

//  userid = uuid4 (UUID는 Universally Unique IDentifier의 약어로 범용 고유 식별자)
// title, description, date, isCompleted, isImportant, userId => body 로 보낸다
// database.query $1 => sql injection 보안 이슈
// try => return res.status (201 : 요청이 성공적이었으며 그 결과로 새로운 리소스가 생성)
// error => return res.sataus (500 : 서버가 처리 방법을 모르는 상황이 발생했습니다. 서버는 아직 처리 방법을 알 수 없습니다.)

exports.postTask = async (req, res) => {
  const _id = uuid4();
  const { title, description, date, isCompleted, isImportant, userId } =
    req.body;
  // console.log(title, description, date, isCompleted, isImportant, userId);

  try {
    await database.query(
      'INSERT INTO task (_id, title, description, date, isCompleted, isImportant, userId) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [_id, title, description, date, isCompleted, isImportant, userId]
    );

    return res.status(201).json({ message: 'Task Created Successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
