const mongoose = require('mongoose')

const NewPlayerSchema = new mongoose.Schema({
      Name: {
        type: String,
        required: true,
        unique: true
      },
      Id: {
        type: String,
        required: true,
        unique: true
      },
      GuildName: {
        type: String,
        required: true
      },
      GuildId: {
        type: String,
        required: true
      },
      AllianceName: {
        type: String
      },
      AllianceId: {
        type: String
      }
    })
    const playerModel = mongoose.model('ARCH Players', NewPlayerSchema)
    module.exports = playerModel