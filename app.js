var express = require("express");
var app = express();
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "121500",
  database: "user",
  port: "3306",
});

connection.connect();
console.log("success");
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});
//实现登录验证功能
app.get("/login", function (req, res) {
  var name = req.query.name;
  console.log(name);
  var pwd = req.query.pwd;
  console.log("pwd", pwd);
  var selectSQL =
    "select * from student where userName = '" +
    name +
    "' and password = '" +
    pwd +
    "'";
  console.log(selectSQL);
  connection.query(selectSQL, function (err, rs) {
    if (err) {
      console.log("[login ERROR] - ", err.message);
      return;
    }
    if (rs == "") {
      console.log("帐号密码错误");
      res.end(name+" "+"login fail");
    } else {
      console.log("OK");
      res.sendFile(__dirname + "/public/OK.html");
    }
  });
});
app.get("/Register.html", function (req, res) {
  res.sendFile(__dirname + "/" + "Register.html");
});
//实现注册功能
app.get("/register", function (req, res) {
  var name = req.query.name;
  var pwd = req.query.pwd;
  var user = { userName: name, password: pwd };
  connection.query("insert into student set ?", user, function (err, rs) {
    if (err) throw err;
    console.log("ok");
    res.sendFile(__dirname + "/public/Reg_ok.html");
  });
});
var server = app.listen(5050, function () {
  console.log("start");
});
