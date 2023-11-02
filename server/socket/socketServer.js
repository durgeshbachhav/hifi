const {Server}= require('socket.io')

const createSocketServer = (httpServer) => {
     const io = new Server(httpServer, {
          cors: {
            origin: process.env.CLIENT_URL, // Adjust to your frontend's URL
            methods: ['GET', 'POST'],
            allowedHeaders: ['my-custom-header'],
            credentials: true,
          },
        });
     let activeUsers = [];
     

     io.on('connection', (socket) => {
          // Handle new user connections
          socket.on('new-user-add', (newUserId) => {

               if (!activeUsers.some((user) => user.userId === newUserId)) {
                    activeUsers.push({
                         userId: newUserId,
                         socketId: socket.id
                    });
               }
               io.emit('get-users', activeUsers);
          });

          // Handle sending messages
          socket.on('send-message', (data) => {
               if (data) {
                    const { receiverId } = data;
                    const user = activeUsers.find((user) => user.userId === receiverId);
                  
                    if (user) {
                         io.to(user.socketId).emit('receive-message', data);
                    }
               }
          });

          // Handle user disconnections
          socket.on('disconnect', () => {
               activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
               io.emit('get-users', activeUsers);
          });
     });
};

module.exports = createSocketServer;
