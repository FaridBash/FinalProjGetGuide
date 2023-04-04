const express=require('express');
const dotenv=require('dotenv').config();
const bodyParser = require('body-parser');
const colors=require('colors');
const path=require('path');
const cors = require('cors');
const port= process.env.PORT || 5858;

const myPath=path.join(__dirname,'../BankAdminFrontend/dist');
console.log(myPath);

const server =express();
server.use(express.static(myPath));
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));
server.use(express.json());
server.use('/api/chat', require('./routes/chatRoutes.js'));






server.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})