require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios')

//--------------------------------------------END OF IMPORTS----------------------------------------//


//==================================================================================================//
//--------------------------------------------USER ENDPOINTS----------------------------------------//
//==================================================================================================//


//-------------------------------------------USER REQUIREMENTS--------------------------------------//

const GuildComs = require('../models/guildComs');
const Guild = require('../models/archGuild');


//--------------------------------------------CREATE NEW USER---------------------------------------//

 router.post('/set/guildcoms', async (req, res) => {
  const {Guilds} = req.body
  let guild = new GuildComs({
    ACCO: Guilds
  })
  await guild.save()
  .then(function (res){
    console.log(res)
  }).catch(function (err){
    console.log(err)
  })
 })

 router.get('/get/guildcoms', async (req, res) => {
  let allGuilds = await GuildComs.find()
  if(allGuilds){
    res.status(200).send(allGuilds[0].ACCO).end()
  }else{
    console.log(err)
  }
 })



module.exports = router






