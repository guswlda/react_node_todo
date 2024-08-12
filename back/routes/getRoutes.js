const router = require('express').Router(); // router는 api path를 가져오는 method
const { getTasks } = require('../controllers/getTasks');

router.get('/get_tasks/:userId', getTasks); // controller의 getTasks를 불러옴 (컨트롤러 함수 연결) - : 은 정해지지 않은 문자열

module.exports = router; // router 모듈 내보내기
