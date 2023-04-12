const express=require('express');
const dotenv=require('dotenv').config();
const bodyParser = require('body-parser');
const colors=require('colors');
const path=require('path');
const cors = require('cors');
const connectDB=require('./config/db');
const {errorHandler}=require('./middleware/errorMiddleware');
const WebSocket = require("ws");
const multer = require('multer');
const port= process.env.PORT || 5858;

const myPath=path.join(__dirname,'../GetGuide/dist');
console.log(myPath);







connectDB();
const server =express();
server.use(express.static(myPath));
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));
server.use(express.json());
server.use('/api/tours', require('./routes/toursRoutes.js'));
server.use('/api/auctions', require('./routes/auctionRoutes'));
server.use('/api/users', require('./routes/userRoutes'));
server.use(errorHandler);





server.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})


const wsServer = new WebSocket.Server({
    noServer: true
})    