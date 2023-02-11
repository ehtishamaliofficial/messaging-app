const express = require('express');
const app = express();
const port = 5000;
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const Error = require('./middleware/Error');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const token = require('./routes/token')
const messageRoutes = require('./routes/messageRoute')
const { Server } = require("socket.io")

//cross-origin resource sharing
app.use(cors());

//Load Env Vars
dotenv.config();


// Connect to MongoDB
connectDB()

//JSON Parser
app.use(express.json());

//Endpoint
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/token', token)
app.use('/api/v1/message', messageRoutes)
//Error Handler
app.use(Error);



const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});


io.on("connection", (socket) => {
    console.log("Connected To Socket.io");
    socket.on("join-chat-room", (roomId) => {
        socket.join(roomId);
        // socket.emit("connect");
    });

    socket.on("send-message", (message) => {
        const { chat, sender } = message;
        const { users } = chat;
        users.map((user) => {
            if (sender._id === user._id) return;
            else return socket.to(chat._id).emit("received-message", message);
        })
    })
})