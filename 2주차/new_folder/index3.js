let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");
const { response } = require("express");

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
//bodyParser : 데이터가 post 타입으로 들어왔을 때 데이터를 파싱한다.

app.post("/create", function (req, res) {
  //post method로 파일 생성
  //보내는 쪽 이름(html)과 받는 쪽 이름이 동일해야 한다.
  let content = req.body.content;
  let filename = req.body.filename;

  fs.writeFile(`./data/${filename}`, content, "utf8", function (err) {
    if (err) {
      console.log(err);
      res.json({
        success: false,
      });
    }
    return;
    res.json({
      success: true,
    });
  });
});

app.get("/view/:filenme", function (req, res) {
  //get이라는 method로 데이터 조회
  let filename = req.params.filename;
  fs.readFile(`./data/${filename}`, "utf8", function (err, data) {
    if (err) {
      console.log(err);
      res.json({
        success: false, //실패했다고 웹 브라우저에 알려준다
      }); //rest api 때 데이터를 주고받는 템플릿, js와 문법이 비슷
      return;
    }
    res.json({
      filename: filename,
      content: data,
    });
  });
});

app.post("/update", function (req, res) {
  let pre_file = req.body.pre_file; //기존 파일
  let new_file = req.body.new_file; //새로운 파일
  let content = req.body.content;

  //pre_file을 new_file로 이름을 바꿔준다.
  fs.rename(`data/${pre_file}`, `data/${new_file}`, function (err) {
    if (err) {
      console.log(err);
      res.json({
        success: false,
      });
      return;
    }
    fs.writeFile(`data/${new_file}`, content, "utf-8", function (err) {
      if (err) {
        console.log(err);
        res.json({
          success: false,
        });
        return;
      }
      res.json({
        success: true,
      });
    });
  });
});

app.post("/delete", function (req, res) {
  let filename = req.body.filename;
  fs.unlink(`./data/${filename}`, function (err) {
    if (err) {
      console.log(err);
      res.json({
        success: false,
      });
      return;
    }
    res.json({
      success: true,
    });
  });
});

app.get("/form", function (req, res) {
  res.send(`<h1>글 생성</h1>
    <form action="/create" method="post">
      <p>제목 : <input type="text" name="filename" /></p>
      <p>내용 : <input type="text" name="content" /></p>
      <input type="submit" value="전송" />
      </form>
      <h1>글 수정</h1>
    <form action="/update" method="post">
      <p>기존 제목 : <input type="text" name="pre_file" /></p>
      <p>새 제목 : <input type="text" name="new_file" /></p>
      <p>내용 : <input type="text" name="content" /></p>
      <input type="submit" value="전송" />
      </form>
      <h1>글 삭제</h1>
    <form action="/delete" method="post">
      <p>
        <input type="text" name="filename" />
        <input type="submit" value="전송" />
      </p>
    </form>
`);
});

app.listen(3001);
