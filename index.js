//requires discord.js
const Discord = require('discord.js');
//require config file
const {prefix,token} = require('./config.json');

//creates a new discord client
//note: a client is like the bot's consciousness
const client = new Discord.Client();

//login to discord w the app's token
client.login(token);



//when the client is ready, run this code
//using .once means it only triggers ONCE when you log in
client.once('ready', () => {
    console.log('Ready!');
    //console.log(JSON.stringify(client.channels) + "\n" + client.readyAt + "\n" + JSON.stringify(client.voice));
});

client.on('message', message => {
    if(message.content === "tsubasa"){
        message.channel.send("TSUBASA!!!");
    }
    var attach = message.attachments.array();
    attach.forEach(element => {
       console.log(element); 
    });
});



