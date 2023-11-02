const mongoose = require('mongoose')

module.exports = async () => {
     const mongouri = process.env.MONGOURI;

     try {
          const connect = await mongoose.connect(mongouri, {
               useNewUrlParser: true,
               useUnifiedTopology: true
          })
          console.log(`mongodb is connected: ${connect.connection.host}`);
     }
     catch (error) {
          console.log(error);
     }
}