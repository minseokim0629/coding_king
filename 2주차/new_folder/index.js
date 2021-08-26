const express = require("express");
const app = express();

app.get("/", function (req, res) {
  //http 요청 메소드
  res.send("Hello world"); //이렇게 데이터를 보낼 것이다.
});

app.listen("3000"); //포트는 3000번으로
