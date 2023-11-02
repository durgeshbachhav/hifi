const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
     email: {
          type: String,
          required: true,
          unique: true,
          lowarcase: true
     },
     password: {
          type: String,
          required: true,
          select: false
     },
     username: {
          type: String,
          required: true
     },
     bio: {
          type: String,
     },
     avatar: {
          publicId: {
               type: String,
          },
          url: {
               type: String,
          }
     },
     website: {
          type: String
     },
     gender: {
          type: String,
     },
     followers: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
     }],
     followings: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'user'
          }
     ],
     posts: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'post'
     }]
},
     {
          timestamps: true,
     }
)

module.exports = mongoose.model('user', userSchema)
