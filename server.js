require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser')

//---------------------------------------END OF IMPORTS-----------------------------------------


mongoose.connect(process.env.MONGO_URI,{useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
mongoose.set('useCreateIndex', true)
db.on('error', (error)=> console.error(error))
db.once('open', ()=>console.log("Connected to DB."))
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`Server Started on port ${PORT}`))

//---------------------------------------END OF DB CONNECTION-----------------------------------------
var corsOptions = {
  credentials: true,
  origin: process.env.WEB_HOST
  };
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
//---------------------------------------END OF MIDDLEWARE-----------------------------------------
app.get('/', (req, res) => {res.send('API Status: Running')})

const UserRouter = require('./routes/users.routes')
app.use('/api/user', UserRouter)

const CaravanReportsRouter = require('./routes/caravanReports.routes')
app.use('/api/caravan_report', CaravanReportsRouter)

const ArchDB = require('./routes/archDB.routes')
app.use('/api/archDB', ArchDB)

const GuildComs = require('./routes/guildComs.routes')
app.use('/api/coms', GuildComs)

//---------------------------------------END OF ROUTES-----------------------------------------


