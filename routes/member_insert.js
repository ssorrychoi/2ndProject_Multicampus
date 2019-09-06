var express = require('express');
var router = express.Router();
  
const mysql = require('mysql');
  
/* GET users listing. */
router.post('/', function(req, res, next) {
  const result = {msg:'Sign up Error'};
  
  let conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'mysql',
    database : '2ndproject'
  });
  
  conn.connect((err)=>{
    if(err){
      return console.error(err.message);
    }
    console.log("Connected to the MySQL Server");
    const sql = `insert into member(ID,NAME,PASSWORD,IDENTITY_NUM,PHONE,ADDRESS,EMAIL) values ('${req.body.id}','${req.body.name}','${req.body.password}','${req.body.id_num}','${req.body.phone}','${req.body.address}','${req.body.email}')`;
    
    console.log(sql);
    conn.query(sql,(err,results,fields)=>{
      if(err){
        console.log(err.message);
        res.json(JSON.stringify(result));
      }else{
        console.log(results,fields);
        result.msg = req.body.name+"님, 가입되셨습니다.<br><br>창을 닫고 Login하세요.";
        req.session.name = req.body.name;
        res.json(JSON.stringify(result));
        console.log(result.msg);
      }
      conn.end((err)=>{
        if(err){
          return console.error(err.message);
        }
      });
    });
  });
  
});
  
module.exports = router;