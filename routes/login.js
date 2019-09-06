var express = require('express');
var router = express.Router();
const mysql = require('mysql'); //1. 드라이버 등록
  
/* GET users listing. */
router.post('/', function(req, res, next) {
  const result = {msg:""};
  
  let conn = mysql.createConnection({     //2.연결
    host : 'localhost',
    user : 'root',
    password : 'mysql',
    database : '2ndproject',
    // dateStrings: 'date'
  });
  
  conn.connect((err)=>{
    if(err){
      return console.error(err.message);
    }
    console.log("Connected to the MySQL Server : ",req.body.login_id);
    const sql = `select * from member where id = '${req.body.login_id}' and password = '${req.body.login_pwd}'`;
    
    console.log(sql);
    conn.query(sql,(err,rs,fields)=>{
      if(err){
        console.log(err.message);
        result.msg='SSORRY';
        res.json(JSON.stringify(result));
      }else{
        if(rs[0]){     //로그인 OK //rs[0]이 존재하면서 &&
          console.log(rs[0].ID,rs[0].PASSWORD);
          req.session.login_id=req.body.login_id;
          req.session.name = rs[0].NAME;
          // req.session.id_num = rs[0].IDENTITY_NUM;

          const s_num = rs[0].IDENTITY_NUM.split("");
          let id_num="";
          for(i=0; i<8; i++)
          {
            id_num += s_num[i];
          }
          let id_num1 = rs[0].IDENTITY_NUM;
          let date;
          let yy = id_num1.substr(0,2);
          let mm = id_num1.substr(2,2);
          let dd = id_num1.substr(4,2);
          date=yy+"."+mm+"."+dd;
          
          req.session.id_num = id_num+"******";
          req.session.id_num1 = date;
          req.session.password = rs[0].PASSWORD;
          req.session.phone = rs[0].PHONE;
          req.session.address = rs[0].ADDRESS;
          req.session.email = rs[0].EMAIL;
          req.session.loginState = true;
          req.session.photo_path = rs[0].PHOTO_PATH;

          result.msg=req.session.name+"님, 반갑습니다.";
          res.json(JSON.stringify(result));
          //res.redirect('/');
        }else{  //로그인 실패
          result.msg="Try Again";
          res.json(JSON.stringify(result));
        }
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
  