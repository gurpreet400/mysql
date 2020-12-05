var express = require('express');
const app = express();
var mysql = require ('mysql');
var bodyparsar = require ('body-parsar');
var coonection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'userdata'
});

app.use(bodyparsar.json());
app.use(bodyparsar.urlencoded({extended:true}));

app.post('/register/',(req,res,next)=>{
    var data = req.body;
    var password = data.password;
    var email = data.email;
    
    connection.query("SELECT * FROM login_info WHERE email= ?",[email],function(err,result,fields){

        connection.on('error',(err)=>{
            console.log("[mysql error]",err);
        });

        if(result && result.length){
            res.json("User already exists");
        }
        else{
            var insert_cmd ="INSERT INTO login_info (name,email,password) values (?,?,?)";
            var values=[email,password];
            console.log(result);
            console.log("executing:" + insert_cmd + "" + values);
    
            connection.query(insert_cmd,values,(err,results,fields)=>{
                connection.on("err",(err)=>{
                    console.log("[mysql error]",err);
                });
                res.json("Registered !");
                console.log(" Registeration Successful.");
            });
        }


    });

});
var server= app.listen(3000, ()=> {
    console.log("Server running at http://localhost:3000");
});