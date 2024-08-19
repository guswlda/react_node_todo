const router = require('express').Router();
const {
  updateCompletedTask,
  updateTask,
} = require('../controllers/updateTask');

// patch : 변경 사항 부분만 업데이트
// put : 전체 업데이트

router.patch('/update_completed_task', updateCompletedTask);

// 수정 버튼 시 update
router.put('/update_task', updateTask);

module.exports = router;
