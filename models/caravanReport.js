const mongoose = require('mongoose')

const NewCaravanReportSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:false
      },
      guild: {
        type: String,
        required: true,
        unique:false
      },
      image: {
        type: String,
        required: true,
        unique:false
      },
      fine: {
          type: Number,
          required: true,
          unique:false
      },
      paid: {
          type: Boolean,
          required: true,
          unique:false
      },
      date: {
          type: Number,
          required: true,
          unique:false
      },
      type: {
          type: String,
          required: true,
          unique:false
      },
      notes: {
          type: String,
          required: false,
          unique:false
      }

    })
    const caravanReportModel = mongoose.model('caravanreports', NewCaravanReportSchema)
    module.exports = caravanReportModel