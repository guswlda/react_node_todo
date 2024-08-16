const router = require('express').Router();
const { updateCompletedTask } = require('../controllers/updateTask');

router.patch('/update_completed_task', updateCompletedTask);

// patch : 변경 사항 부분만 업데이트
// put : 전체 업데이트

module.exports = router;
