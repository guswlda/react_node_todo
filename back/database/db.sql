-- 테이블 생성
CREATE TABLE task (
    _id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    isCompleted BOOLEAN NOT NULL DEFAULT false,
    isImportant BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    userId TEXT NOT NULL
);

-- 데이터 추가
INSERT INTO task (_id, title, description, date, isCompleted, isImportant, userId) VALUES ('1', '할일1', '할일1 설명' '2024-08-12', false, false, 'guswlda');

-- 데이터 조회
SELECT * FROM task;

-- 특정 사용자 데이터 필터 조회
SELECT * FROM task WHERE userid= 'happy';

-- Timezone 변경
ALTER DATABASE postgres SET timezone = 'Asia/Seoul';

SHOW timezone;

SET timezone = 'Asia/Seoul';

-- 데이터 삭제
DELETE FROM task WHERE _id = '1234';

-- 데이터 update
UPDATE task SET iscompleted = true  WHERE _id = '1236'