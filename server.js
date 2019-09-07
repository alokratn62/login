const express = require("express");
const app =express();
const port = 3000;
const path=require("path");
const bodyParser = require("body-Parser");
const mongoose = require('mongoose');
const model = require('./model.js');

mongoose.connect("mongodb+srv://ts:kamine@cluster0-1om9z.mongodb.net/userdb?retryWrites=true",()=>{
    console.log("DB Connected");
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/save',(req,res,next)=>{
     console.log(req.body);
     const newUser = new model({
        email: req.body.email,
        password:req.body.password
     });
     newUser
          .save()
          .then((result)=>{
              console.log(result);
              res.status(200).json({
                  message:"User saved successfully",
                  status:true
              });
          })
          .catch((err)=>{
              console.log(err);
              throw err;
          });
});

// app.get('/',function(req,res,next){
//     console.log("i am inside /");
// });

// app.post('/save',function(req,res,next){
//     console.log(req.body);
//     console.log("hello world");
//     res.send("something something");
// });


app.listen(port,function(){
    console.log("server has started at : "+port);
});

