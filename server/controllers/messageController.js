const { error, success } = require('../utils/responseWrapper');

const Message = require('../models/Message')

const addMessage = async (req, res) => {
     const { chatId, senderId, text } = req.body;
     const newMessage = new Message({
          chatId,
          senderId,
          text
     })

     try {
          const result = await newMessage.save();
          return res.send(success(200, { result }))
     } catch (e) {
          return res.send(error(500, e.messgae))

     }
}

const getMessage = async (req, res) => {
     const { chatId } = req.params;
     try {
          const messages = await Message.find({ chatId });
          return res.send(success(200, { messages }))

     } catch (e) {
          return res.send(error(500, e.messgae))
     }
}


module.exports = {
     addMessage,
     getMessage
}