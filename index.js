// Import the discord.js module
const Discord = require("discord.js");

// import functions
const Ping = require('./commands/ping')
// const openaiJimmy = require('./commands/ask-jimmy');
const Spam = require('./commands/spam');
const Help = require('./commands/help');
const CoinPrice = require('./commands/coin-price');
const IsLive = require('./commands/isLive');
const AddLink = require('./commands/add-link');

//express
const express = require('express');
const app = express();
const port = 3001;

app.use(express.json()) // for parsing application/json

app.post('/isLive', (req, res) => {
  console.log(req);
  res.send("ok");
})

// Create an instance of a Discord client
const client = new Discord.Client();

//auth token
const auth = require("./auth.json");

//prefix baby!
const prefix = "!";

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on("ready", () => {
  console.log("bot on");

  //send message to personal channel to let me know that the bot is on/off
  // let channel = client.channels.get("543811624213938186");
  // channel.send("bot here");
});

// Create an event listener for messages
client.on("message", (message) => {
  //exit and stop if prefix ain't here
  if (!message.content.startsWith(prefix)) return;
  //make sure the bot doesn't loop itself
  if (message.author.bot) return;

  //help commands
  if (message.content.startsWith(`${prefix}help`)) {
    Help.help(message);
  }

  //ping for some reason
  if (message.content.startsWith(`${prefix}ping`)) {
    Ping.Ping(message);  
  }

  //open ai question and answer
  // ask jimmy is broken because i'm out of free tokens with open AI
  // if (message.content.startsWith(`${prefix}askJimmy`)) {
  //   openaiJimmy.askJimmy(message);  
  // }

  //key feature, spam
  if (message.content.startsWith(`${prefix}spam`)) {
    Spam.Spam(message);
  }

  //bitcoin price, thanks coindesk
  if (message.content.startsWith(`${prefix}coinprice`)) {
    CoinPrice.coinPrice(message);
  }

  //don't buy crypto, kids
  if (message.content.startsWith(`${prefix}crypto`)) {
    message.channel.send("don't buy crypto kids, it's a scam");
  }

  // is a streamer live?
  if (message.content.startsWith(`${prefix}isLive`)) {
    IsLive.isLive(message);
  }

  // add link 
  if (message.content.startsWith(`${prefix}add`)) {
    // if this command is used somewhere else, do nothing
    if (message.guild.id !== '387687696992174080') return;

    AddLink.addLink(message);

  }
});

//specific word listeners
const everyone = "@everyone";

client.on("message", (message) => {
  //don't want to mention @everyone... that's just bad manners
  if (message.content.includes(everyone)) {
    message
      .delete()
      .then((msg) =>
        message.channel.send(
          `${msg.author.username} mentioned everyone, that's just bad manners, so I deleted the message.`
        )
      )
      .catch(console.error);
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(auth.token);

app.listen(port, () => {
  console.log(`express listening on port ${port}`)
});
