const express = require('express');
const dbconnect = require('./config/dbconnect');
require('dotenv').config();
const morgan = require('morgan')
const http = require('http')

const AuthRoutes = require('./routes/authRouter')
const PostRoutes = require('./routes/postRouter')
const userRoutes = require('./routes/userRouter')
const chatRoutes = require('./routes/chatRouter')
const messageRoutes = require('./routes/messageRouter')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();
app.use(express.json({ limit: '10mb' }))
app.use(morgan('common'))
app.use(cookieParser())
app.use(cors({
     origin: process.env.CLIENT_URL,
     credentials: true
}))

const port = process.env.PORT || 5000;
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer)
const SocketServer = require('./socket/socketServer.js')

app.use('/auth', AuthRoutes)
app.use('/post', PostRoutes)
app.use('/user', userRoutes)
app.use('/chat', chatRoutes)
app.use('/message', messageRoutes)
SocketServer(httpServer);
dbconnect();
httpServer.listen(port, ()=>{
     console.log('server started on',port);
})

