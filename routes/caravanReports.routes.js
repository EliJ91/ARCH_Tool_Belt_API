require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {auth} = require('../middleware/authorization.middleware')

//--------------------------------------------END OF IMPORTS----------------------------------------//


//==================================================================================================//
//--------------------------------------------USER ENDPOINTS----------------------------------------//
//==================================================================================================//


//-------------------------------------------USER REQUIREMENTS--------------------------------------//
const CaravanReport = require('../models/caravanReport');
const { db } = require('../models/caravanReport');


//--------------------------------------------CREATE NEW USER---------------------------------------//
router.post('/create', async (req, res) => {
  const {username, password, avatar} = req.body
  try {
    let createdUser = await User.findOne({
      username
    })
    if (createdUser) {
      res.status(422).json({
        error: [
          {
            msg: 'User already exists'
          }
        ]
      })
    } else {
      createdUser = new User({
        username,
        password,
        avatar
      })
      const salt = await bcrypt.genSalt(10)

      createdUser.password = await bcrypt.hash(password, salt)

      await createdUser.save()
      res.status(201).json(req.body).end()
    }
  } catch (err) {
    console.log(err)
    
  }
})


//-----------------------------------------------Create Caravan Report-----------------------------------------//
router.post('/report', async (req, res) => {
    try {
        console.log(req.body)
        const {username, guild, image} = req.body
      if (!username || !guild || !image) {
        return res.status(400).json({ msg: 'Please enter required fields' })
      }else{
        let date = new Date();
        let month = date.getMonth()+1
        let day = date.getDate()
        let year = date.getFullYear()
        createdCaravanReport = new CaravanReport({
            username,
            guild,
            image,
            fine : 0,
            paid : false,
            date : [month,day,year],
            type : "Caravan",
            notes: ""
          })

            await createdCaravanReport.save()
            res.status(201).json(req.body).end()

      }
    }catch(err) {
      res.err
      console.log(err)
    }
  })
//-----------------------------------------------LOG OUT USER-----------------------------------------//

router.get('/caravanreports', async (req,res)=>{
    let allDocuments = await CaravanReport.find()
    console.log(allDocuments)
    if(allDocuments){
        res.json([allDocuments])
    }else{
        console.log("Error")
    }
})

router.get('/test', async (req,res)=>{
    x = true
    if(x){
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Methods": "*"
            },
            body: "good"
        }
    }else{
        console.log("Error")
    }
})

 
module.exports = router






