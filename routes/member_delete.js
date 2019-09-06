var express = require('express');
var router = express.Router();
  
const mysql = require('mysql');
  
/* GET users listing. */
router.get('/', function(req, res, next) {
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
    const sql = `delete from member where ID = '${req.session.login_id}'`;
    
    console.log(sql);
    conn.query(sql,(err,results,fields)=>{
      if(err){
        console.log(err.message);
        res.json(JSON.stringify(result));
      }else{


        req.session.destroy();
        result.msg = "삭제 완료";
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