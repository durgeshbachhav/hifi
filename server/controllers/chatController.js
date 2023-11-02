const { error, success } = require('../utils/responseWrapper');

const Chat = require('../models/Chat')


 const createChatController = async (req, res) => {
     const newChat = new Chat({
          members: [req.body.senderId, req.body.receiverId],
     })
     try {
          const result = await newChat.save();
          return res.send(success(200, { result }))
     } catch (e) {
          return res.send(error(500, e.message))

     }
}


 const userChatController = async (req, res) => {
     try {
          const chat = await Chat.find({
               members: { $in: [req.params.userId] }

          })
          return res.send(success(200, { chat }))
     } catch (e) {
          return res.send(error(500, e.message))
     }
}

 const findChatController = async (req, res) => {
     try {
          const chat = await Chat.findOne({
               members: { $all: [req.params.firstId, req.params.secondId] }
          })
          return res.send(success(200, { chat }))
     } catch (e) {
          return res.send(error(500, e.message))
     }
}

module.exports={
     createChatController,
     userChatController,
     findChatController
}