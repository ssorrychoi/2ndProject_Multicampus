var express = require('express');
var router = express.Router();
const mysql = require('mysql'); //1. 드라이버 등록

/* GET users listing. */
router.post('/', function(req, res, next) {

    let conn = mysql.createConnection({     //2.연결
        host : 'localhost',
        user : 'root',
        password : 'mysql',
        database : '2ndproject'
        // dateStrings: 'date'
      });

      conn.connect((err)=>{
        if(err){
          return console.error(err.message);
        }
        console.log("Connected to the MySQL Server : ",req.session.login_id);
        const filepath = "upload/" + req.session.login_id + "_" +req.body.new_filepath;
        const sql = `update member set PHOTO_PATH = '${filepath}' where ID = '${req.session.login_id}'`;

        //req.session.loginState=false;
        conn.query(sql,(err,rs,fields)=>{
          if(err){
            console.log(err.message);
           
          }else{
            
            const msg = {msg:"Completed"};
            res.json(JSON.stringify(msg));
          }
          conn.end((err)=>{
            if(err){
              return console.error(err.message);
            }
            console.log("conn close");
          });
        });
      });

});
  
module.exports = router;