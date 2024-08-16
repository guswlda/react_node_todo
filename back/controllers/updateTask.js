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
