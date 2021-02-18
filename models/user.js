const mongoose = require('mongoose')

const NewUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      approved: {
        type: Boolean,
        required: false
      }
    })
    const userModel = mongoose.model('NewUsers', NewUserSchema)
    module.exports = userModel