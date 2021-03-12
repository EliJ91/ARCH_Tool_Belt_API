require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios')

//--------------------------------------------END OF IMPORTS----------------------------------------//


//==================================================================================================//
//--------------------------------------------USER ENDPOINTS----------------------------------------//
//==================================================================================================//


//-------------------------------------------USER REQUIREMENTS--------------------------------------//
const Guild = require('../models/archGuild');
const Player = require('../models/archPlayer');



//--------------------------------------------CREATE NEW USER---------------------------------------//
router.get('/getGuilds', async (req, res) => {
  Guild.deleteMany({}).then(function(){
    console.log("ARCH Guild Data deleted"); // Success
}).catch(function(error){
    console.log(error); // Failure
});
  let alliance = [
   "hRqowi9bTw6o44R0bsmIUw" // ARCH
  ,"XLFveeuGSBeI5A-Wa_qNJQ" //ARCHH
  ,"Frsap5z8RvS9FILarCgV5g" //ARCHK
]
for(i=0;i<alliance.length;i++){
    let guilds = []
    await axios.get("https://gameinfo.albiononline.com/api/gameinfo/alliances/"+alliance[i])
              .then(function (response) {
                  guilds = response.data.Guilds
                })
                .catch(function (error) {
                  console.log(error);
                })

    guilds.map((g) =>{
      let guild = new Guild({
      Id:g.Id,
      Name:g.Name
      })
      guild.save()
    })
    console.log("*ARCH Guilds DB Updated!")
    res.status(200).end()
  }
})
//=======================================================//
router.get('/getPlayers', async (req, res) => {
  let allGuilds = await Guild.find()
  let allPlayers = []
  await Player.deleteMany({}).then(function(){
    console.log("**ARCH Player Data deleted"); // Success
  }).catch(function(error){
      console.log(error); // Failure
  });

  for(let i=0; i<=allGuilds.length; i++){
    if(i===allGuilds.length){
      process.stdout.write("\n")
      savePlayers()
    }else{
      process.stdout.write("\r\x1b[K")
      process.stdout.write(`Pulling players from Guild ${i} out of ${allGuilds.length-1}`);
      await axios.get("https://gameinfo.albiononline.com/api/gameinfo/guilds/"+allGuilds[i].Id+"/members")
            .then(function (response) {
              if(response.data.length>0){
                response.data.map((player)=>allPlayers.push(player))
              }
            })
              .catch(function (error) {
                console.log("Error",allGuilds[i])
                i--
              })
    }
  }
  async function savePlayers(){
                    for(let g=0; g<allPlayers.length; g++){
                      process.stdout.write("\r\x1b[K")
                      process.stdout.write(`Saving player ${g} out of ${allPlayers.length-1} players`);
                            let player = new Player({
                              Name: allPlayers[g].Name,
                              Id: allPlayers[g].Id,
                              GuildName: allPlayers[g].GuildName,
                              GuildId: allPlayers[g].GuildId,
                              AllianceName: allPlayers[g].AllianceName,
                              AllianceId: allPlayers[g].AllianceId
                            })
                    await player.save()
                  }
                  console.log("\nUpdated Player Base!")
  }
  res.end()
})
//=================================================//
router.post('/checkinfo', async (req, res) => {
 const {Name, GuildName} = req.body
 let playerFound = await Player.findOne({Name: new RegExp('\\b' + Name + '\\b', 'i')})
 let guildFound = await Guild.findOne({Name: new RegExp('\\b' + GuildName + '\\b', 'i')})
 if(guildFound && playerFound){
   res.status(200).send(true).end()
 }else{
  res.status(404).send(false).end()
 }
})

router.post('/addplayer', async (req, res) => {
  const NameArgument = req.body.Name
  let player;
    await axios.get("https://gameinfo.albiononline.com/api/gameinfo/search?q="+NameArgument).then(function (res){
          player = res.data.players.find(player=>player.Name.toLowerCase() === NameArgument.toLowerCase())
      }).catch(function (err){
        res.status(404).send({msg:`${NameArgument} was not found to be an Albion Player.`}).end()
      })
      if(player){
        const {Name,Id,GuildName,GuildId,AllianceName,AllianceId} = player
        let playerFound = await Player.findOne({Name: new RegExp('\\b' + Name + '\\b', 'i')})
        if(playerFound){
          res.status(422).send({
                msg: `${Name} already exists in the database.`
          }).end()
        }else{
          let player = new Player({Name,Id,GuildName,GuildId,AllianceName,AllianceId})
          await player.save()
          res.status(201).send({
            msg: `${Name} added to the database.`
          }).end()
        }
      }else{
        res.status(404).send({msg:`${NameArgument} was not found to be an Albion Player.`}).end()
      }
 })

 router.post('/checkplayerguild', async (req, res) => {
  const {Name} = req.body
  let playerFound = await Player.findOne({Name: new RegExp('\\b' + Name + '\\b', 'i')})
  if(playerFound){
    res.status(200).send(playerFound).end()
  }else{
   res.status(404).end()
  }
 })

 router.get('/getallguilds', async (req, res) => {
  let allGuilds = await Guild.find()
  if(allGuilds){
    res.status(200).send(allGuilds).end()
  }else{
    console.log(err)
  }
 })



module.exports = router






