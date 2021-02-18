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


//-----------------------------------------------CREATE CARAVAN REPORT-----------------------------------------//
router.post('/report', async (req, res) => {
    try {
        const {username, guild, image} = req.body
      if (!username || !guild || !image) {
        return res.status(400).json({ msg: 'Please enter required fields' })
      }else{
        let date = new Date();
        createdCaravanReport = new CaravanReport({
            username,
            guild,
            image,
            fine : 0,
            paid : false,
            date : date,
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
//-----------------------------------------------GET ALL CARAVAN REPORTS-----------------------------------------//

router.get('/caravanreports', async (req,res)=>{
    let allDocuments = await CaravanReport.find()
    if(allDocuments){
        res.json([allDocuments])
    }else{
        console.log("Error")
    }
})

router.get('/updatepaid', async (req,res)=>{
  const {value, id} = req.query
  await CaravanReport.findByIdAndUpdate({_id: id},{"paid": value}, function(err, result){
    if(err){
        res.send(err)
    }
  })
  let allDocuments = await CaravanReport.find()
  if(allDocuments){
      res.json([allDocuments])
  }else{
      console.log("Error")
  }
})

router.get('/updatefine', async (req,res)=>{
  const {value, id} = req.query
  await CaravanReport.findByIdAndUpdate({_id: id},{"fine": value}, function(err, result){
    if(err){
        res.send(err)
    }
  })
  let allDocuments = await CaravanReport.find()
  if(allDocuments){
      res.json([allDocuments])
  }else{
      console.log("Error")
  }
})

router.get('/updatenote', async (req,res)=>{
  const {value, id} = req.query
  await CaravanReport.findByIdAndUpdate({_id: id},{"notes": value}, function(err, result){
    if(err){
        res.send(err)
    }
  })
  let allDocuments = await CaravanReport.find()
  if(allDocuments){
      res.json([allDocuments])
  }else{
      console.log("Error")
  }
})


module.exports = router






