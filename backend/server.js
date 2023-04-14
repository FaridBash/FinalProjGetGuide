const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const colors = require('colors');
const path = require('path');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const port = process.env.PORT || 5858;
const myPath = path.join(__dirname, '../GetGuide/dist');
console.log(myPath);

connectDB();

app.use(express.static(myPath));
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/tours', require('./routes/toursRoutes.js'));
app.use('/api/auctions', require('./routes/auctionRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`user connected on socket ${socket.id}`);
  
  socket.on("join_room", (data) => {
      socket.join(data);
    });
    
    socket.on("send-message",(data)=>{
        io.emit("recieve-message", data)
    })

    
    socket.on("send-bid",(data)=>{
        io.in(data.room).emit("recieve-bid", data)
    })

});


server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
