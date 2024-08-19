const database = require('../database/database');

// iscompleted (table name), 실제 데이터 : isCompleted (콘솔)
// post와 같이 body 내용 첨부
exports.updateCompletedTask = async (req, res) => {
  const { isCompleted, itemId } = req.body;

  // 변수가 두 개, $1 = isCompleted / $2 = itemId
  try {
    const result = await database.query(
      'UPDATE task SET iscompleted = $1 WHERE _id = $2',
      [isCompleted, itemId]
    );
    return res.status(200).json({ message: 'Task Updated Successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Update Completed Fail' + error });
  }
};

// 수정 버튼 시 update
exports.updateTask = async (req, res) => {
  const { title, description, date, isCompleted, isImportant, id } = req.body;
  // console.log(req.body); => _id (콘솔로 확인 시 실제로 id로 받고 있음)

  try {
    const result = await database.query(
      'UPDATE task SET title = $1, description = $2, date = $3, iscompleted = $4, isimportant = $5 WHERE _id=$6',
      [title, description, date, isCompleted, isImportant, id]
    );
    return res.status(200).json({ message: 'Task Updated Successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Update Completed Fail' + error });
  }
};
