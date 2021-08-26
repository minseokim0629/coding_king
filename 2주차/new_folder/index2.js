const axios = require("axios").default;
const express = require("express");
const app = express();

app.get("/:name", (req, res) => {
  //app.get을 이용하여 데이터를 받아온다
  //:name 파라미터
  //javascript는 비동기식 언어
  axios
    .get(`https://api.agify.io/?name=${req.params.name}`)
    .then(function (result) {
      res.json({
        name: result.data.name,
        age: result.data.age,
      });
    });
});

app.listen(3000);
