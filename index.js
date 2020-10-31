//requires discord.js
const Discord = require('discord.js');
//require config file
const {prefix,token} = require('./config.json');

//creates a new discord client
//note: a client is like the bot's consciousness
const client = new Discord.Client();

//login to discord w the app's token
client.login(token);

let songQueue = [];


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
    
    
    
});

client.on('message', async message =>{
    

    if(!message.content.startsWith(`${prefix}`)){
        console.log("A");
        return;
    }

    if(message.content.startsWith(`${prefix}play`)  || message.content.startsWith(`${prefix}p`)){
        console.log("B");

        //if the sender is not in a voice channel, return an error
        let voiceChannel = message.member.voice.channel;
        if(!voiceChannel){
            message.channel.send("Must join a voice channel before queueing!");
            return;
        }

        //if bot doesn't have permission to speak in voice, return an error

        if(!voiceChannel.permissionsFor(message.client.user).has("CONNECT") ||
            !voiceChannel.permissionsFor(message.client.user).has("SPEAK")){
            message.channel.send("Need permission to join :(");
            return;
        }

        console.log("RAN");

        var musicattach = message.attachments.array();
        //if content is an attachment
        //console.log(musicattach.length)
        if(musicattach.length !== 0){

            //should only be one attachment
            console.log(musicattach[0]);
            const song = {
                title: musicattach[0].name,
                url: musicattach[0].attachment
            };

            songQueue.push(song);
            songQueue.forEach(element => console.log(element));

            console.log("Queue length: " + songQueue.length);

            
            
            const connect = await message.member.voice.channel.join();


            const dispatcher = connect.play(songQueue[0].url)
                .on("start", () => {
                    message.channel.send("Playing: "+ songQueue[0].title);
                })
                .on("finish", () => {
                    console.log(songQueue[0] + " has finished playing.");
                    songQueue.shift();
                    if(songQueue.length !== 0){
                        dispatcher.play(songQueue[0].url);
                    }
                })
                .on("error", console.error);
            
            // while(songQueue.length !== 0){
                
            //     const dispatcher = connect.play(songQueue[0].url);

            //     dispatcher.on('start', () =>{
            //         message.channel.send("Playing: "+ songQueue[0].title);
            //     });
                
            //     dispatcher.on('finish', () => {
            //         console.log(songQueue[0] + " has finished playing.");
            //     });

            //     dispatcher.on('error', console.error);
                
            //     songQueue.shift();
                
            // }
            
            //dispatch
        }

        //if no attachment, parse message for url
    }

    //skip command
    else if(message.content.startsWith(`${prefix}skip`) || message.content.startsWith(`${prefix}s`)){
        console.log("Skipped");
    }

    //pause command
    else if(message.content.startsWith(`${prefix}pause`)){

    }

    else if(message.content.startsWith(`${prefix}leave`) || message.content.startsWith(`${prefix}go away`)){
        console.log("Leaving");
        message.member.voice.channel.leave();
    }

});



