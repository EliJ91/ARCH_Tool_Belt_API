const mongoose = require('mongoose')

const NewGuildSchema = new mongoose.Schema({
    Id: {
        type: String,
        required: true,
        unique: true
      },
      Name: {
        type: String,
        required: true,
        unique: true
      }
    })
    const guildModel = mongoose.model('ARCH Guilds', NewGuildSchema)
    module.exports = guildModel