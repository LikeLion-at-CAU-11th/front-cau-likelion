# API

[](http://front.cau-likelion.org/)

### /signup `POST`

요청 body

```json
{
  "id": "dlehdrlf09",
  "pw": "1234",
  "name": "동길",
  "age": 24
}
```

응답

```json
{
  "status": 200,
  "message": "회원가입 성공"
}
```

### /login `POST`

요청 body

```json
{
  "id": "dlehdrlf09",
  "pw": "1234"
}
```

응답

```json
{
  "status": 200,
  "message": "로그인 성공",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRsZWhkcmxmMDkiLCJpYXQiOjE2ODg1MjEwNTQsImV4cCI6MTY4ODUyMTExNH0.zFXsXp2gRGUUwlZGNSfQgDcbEJw4xVTx_y7Ff1ev_Fc",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJbVJzWldoa2NteG1NRGtpTENKcFlYUWlPakUyT0RnMU1qRXdOVFFzSW1WNGNDSTZNVFk0T0RVeU1URXhOSDAuekZYc1hwMmdSR1VVd2xaR05TZlFnRGNiRUp3NHhWVHhfeTdGZjFldl9GYyIsImlkIjoiZGxlaGRybGYwOSIsImlhdCI6MTY4ODUyMTA1NCwiZXhwIjoxNjg5NzMwNjU0fQ.4ugtl0owCT5kmphBhUUJD971N_myBY0WMAwgPZSWqq8"
  }
}
```

응답 실패 `**401**`

```json
로그인 실패
```

### /mypage `GET`

headers.Authorization 필수

응답

```json
{
  "name": "동길",
  "age": 24
}
```

응답 실패 `**401**`

```json
//JWT가 유효하지 않은 경우
{
    "message": "JWT가 유효하지 않습니다."
}
//JWT가 없는 경우
{
    "message": "JWT가 필요합니다."
}
```

### /refresh `POST`

headers.Authorization 필수

요청 body

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJbVJzWldoa2NteG1NRGtpTENKcFlYUWlPakUyT0RnMU1qRXlOamtzSW1WNGNDSTZNVFk0T0RVeU1UTXlPWDAuUFJ6R3l2RTlEMnJrY3o5VEJRWk9kQ0E1VmxaYnlSUWhwZjFVc3NkUENQMCIsImlkIjoiZGxlaGRybGYwOSIsImlhdCI6MTY4ODUyMTI2OSwiZXhwIjoxNjg5NzMwODY5fQ.q9k8ayCLROwkRxD-T1sMQMgo1s6SVcCXK-zQkbHXGC4"
}
```

응답

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRsZWhkcmxmMDkiLCJpYXQiOjE2ODg1MjEzMTksImV4cCI6MTY4ODUyMTM3OX0.NSVjNGh2e2yUM_hF6nwRvj8ZTgf_PUIGQlRjpof_EcM",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJbVJzWldoa2NteG1NRGtpTENKcFlYUWlPakUyT0RnMU1qRXpNVGtzSW1WNGNDSTZNVFk0T0RVeU1UTTNPWDAuTlNWak5HaDJlMnlVTV9oRjZud1J2ajhaVGdmX1BVSUdRbFJqcG9mX0VjTSIsImlkIjoiZGxlaGRybGYwOSIsImlhdCI6MTY4ODUyMTMxOSwiZXhwIjoxNjg5NzMwOTE5fQ._wKxN-8bh4o7lsR7UlCLFKFcJgDS0jLrbxJyPu_r3sc"
}
```

응답 실패 `**401**`

```json
{
  "message": "유효하지 않은 refresh token입니다."
}
```

### /user `GET`

`**GET /user?page={pageNum}**`

pageNum 별로 member목록을 받아옵니다.

0: 전체 목록

1~7: 1페이지당 4개씩

`**GET /user?stack={stack}**`

stack 별로 member 목록을 받아옵니다.

frontend, backend, design, pm

`**GET /user?gender={gender}**`

gender별로 member 목록을 받아옵니다.

male, female

응답 예시

http://front.cau-likelion.org/user?page=1

```json
{
  "message": "success",
  "data": [
    {
      "id": 0,
      "name": "박준형",
      "major": "소프트웨어",
      "generation": 11,
      "gender": "male",
      "stack": "frontend"
    },
    {
      "id": 1,
      "name": "고민지",
      "major": "경영",
      "generation": 11,
      "gender": "female",
      "stack": "frontend"
    },
    {
      "id": 2,
      "name": "박경빈",
      "major": "소프트웨어",
      "generation": 11,
      "gender": "female",
      "stack": "frontend"
    },
    {
      "id": 3,
      "name": "박규한",
      "major": "소프트웨어",
      "generation": 11,
      "gender": "male",
      "stack": "frontend"
    }
  ]
}
```

### /liontest/question

멋사인 테스트 질문 받아오기

응답

```json
{
  "message": "success",
  "data": [
    {
      "id": 0,
      "title": "멋쟁이 사자처럼 중앙대학교의 10기 회장님은 누굴까요?",
      "answerList": [
        {
          "aid": 0,
          "content": "윤선영"
        },
        {
          "aid": 1,
          "content": "이성민"
        },
        {
          "aid": 2,
          "content": "최윤한"
        }
      ]
    },
    {
      "id": 1,
      "title": "문제는 무엇일까요?",
      "answerList": [
        {
          "aid": 0,
          "content": "윤선영"
        },
        {
          "aid": 1,
          "content": "이성민"
        },
        {
          "aid": 2,
          "content": "최윤한"
        }
        ...
      ]
    }
  ]
}
```

### /liontest/result `POST`

테스트 결과 API

요청 BODY

**요청 Body의 길이가 9가 되어야 합니다.**

```json
{
  "answer": [
    {
      "id": 0,
      "answer": 2
    },
    {
      "id": 1,
      "answer": 0
    },
    {
      "id": 2,
      "answer": 0
    },
    {
      "id": 3,
      "answer": 2
    },
    {
      "id": 4,
      "answer": 1
    }
    ...
  ]
}
```

응답 예시

```json
{
  "message": "success",
  "data": {
    "result": 6,
    "incorrect": [
      {
        "title": "문제입니다.",
        "answer": "답이요"
      },
      {
        "title": "문제입니다.",
        "answer": "답이요"
      }
    ]
  }
}
```

### 실습코드

[FE-SESSION/week12 at main · LikeLion-at-CAU-11th/FE-SESSION](https://github.com/LikeLion-at-CAU-11th/FE-SESSION/tree/main/week12)
