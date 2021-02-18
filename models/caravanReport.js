const mongoose = require('mongoose')

const NewCaravanReportSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: false
      },
      guild: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      fine: {
          type: Number,
          required: true
      },
      paid: {
          type: Boolean,
          required: true
      },
      date: {
          type: Number,
          required: true
      },
      type: {
          type: String,
          required: true
      },
      notes: {
          type: String,
          required: false
      }

    })
    const caravanReportModel = mongoose.model('caravanreports', NewCaravanReportSchema)
    module.exports = caravanReportModel