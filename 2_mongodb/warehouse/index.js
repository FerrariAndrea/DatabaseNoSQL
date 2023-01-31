const DB = "mongodb+srv://tsg:WxLLWDAx2kwWoTQv@cluster0.vgyfv.mongodb.net/warehouse?retryWrites=true&w=majority";


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const item = require('./collections/item');
const user = require('./collections/user');

 function cb(err){
  if(err) {console.log(err) }
  else{
    console.log("Database connected!");
    const server = express()
    .use(cors())
    .use('/hello',  function(req, res){
       if( req.query.name!==undefined){
        res.send("<p>Hello "+ req.query.name+"</p>");
       }else{
        res.send("<p>Who are you?</p>");
       }
    })  
    .use('/create_user', function(req, res){
      if( req.query.name!==undefined){
          const nuovo_utente = new user({name:req.query.name, data_cre:new Date()});
          nuovo_utente.save();
          res.send("<p>ok</p>");
       }else{
          res.send("<p>err</p>");
       }
   }) 
   .use('/list_users', async function(req, res){
        var ris ="";
        const users=await user.find({name:"prova"});
        for(var x=0;x<users.length;x++){
          ris=ris+"<p>"+users[x].name+"</p>";
        }
        res.send(ris);
  })
    .use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'POST', 'GET, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      return next();
    })
    .listen(4000,async () =>{
      console.log(`Listening on 4000`);
  });
}
}
//DB connection
mongoose.connect(DB,cb);