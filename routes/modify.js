var express = require('express');
var router = express.Router();
  
const mysql = require('mysql');
  
/* GET users listing. */
router.post('/', function(req, res, next) {
  const result = {msg:'Modify Error'};
  
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
    const sql = `update member set PASSWORD = '${req.body.password}', NAME = '${req.body.name}', PHONE = '${req.body.phone}', EMAIL = '${req.body.email}', ADDRESS = '${req.body.address}' where ID = '${req.session.login_id}'`;
    
    console.log(sql);
    conn.query(sql,(err,results,fields)=>{
      if(err){
        console.log(err.message);
        res.json(JSON.stringify(result));
      }else{
        console.log(results,fields);
        req.session.loginState=false;
        res.json(JSON.stringify(result));
        result.msg = "수정 완료";
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