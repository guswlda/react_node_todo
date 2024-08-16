const PORT = '8080'; // 8080 포트를 사용
const express = require('express'); // express 모듈 사용
const cors = require('cors'); // cors 모듈 사용

const app = express(); // express 모듈을 app 변수 할당

// const corsOptions = {
//   origin: 'http://localhost:3000', // 허용할 주소
//   credentials: true, // 인증 정보 허용
// };

// const corsOption2 = ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors()); // html 로 보낼 시 cors 에러 발생 => 보안 이슈 (서버에서는 HTML, URL로 보낸 값을 보내주지 않음 보안 조치를 해야함)
app.use(express.json()); // express를 사용할 때 json 파싱

app.get('/', (req, res) => {
  res.send('Hello World');
});

// controller와 routes 사용하지 전 코드
// app.get('/get_tasks', async (req, res) => {
//   try {
//     const result = await database.query('SELECT * FROM task');
//     return res.status(200).json(result.rows); // result.rows : 실제 사용할 내용
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

app.use(require('./routes/getRoutes')); // getRoutes 사용
app.use(require('./routes/postRoutes')); // postRoutes 사용
app.use(require('./routes/deleteRoutes')); // deleteRoutes 사용
app.use(require('./routes/updateRoutes')); // updateRoutes 사용

app.listen(PORT, () => console.log(`Server is running on ${PORT}`)); // 서버 실행 시 메시지 출력
