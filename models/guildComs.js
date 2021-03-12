const mongoose = require('mongoose')

const NewGuildComsSchema = new mongoose.Schema({
    ACCO: {
        type: Array
      }
    })
    const guildComsModel = mongoose.model('Guilds Coms', NewGuildComsSchema)
    module.exports = guildComsModel