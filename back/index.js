const PORT = '8080';
const express = require('express'); // express 모듈 사용
const cors = require('cors'); // cors 모듈 사용

const app = express(); // express 모듈을 app 변수 할당

// const corsOptions = {
//   origin: 'http://localhost:3000', // 허용할 주소
//   credentials: true, // 인증 정보 허용
// };

// const corsOption2 = ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors()); // http 보안 이슈
app.use(express.json()); // express를 사용할 때 json 파싱

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.get('/get_tasks', async (req, res) => {
//   try {
//     const result = await database.query('SELECT * FROM task');
//     return res.status(200).json(result.rows); // result.rows : 실제 사용할 내용
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

app.use(require('./routes/getRoutes'));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`)); // 서버 실행 시 메시지 출력
