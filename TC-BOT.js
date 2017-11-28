const Discord = require('discord.js');
const client = new Discord.Client();
const yt = require('ytdl-core');
const search = require('youtube-search');
//START-UP
client.on('ready', () => {
    console.log('TC BOT is now online');
    client.user.setPresence({ game: { name: `${client.user.username}|.help`, type: 0 } });

});

const prefix = ".";
//EVENTS
client.on('guildMemberAdd', member => {
  let guild = member.guild;
  const embed = new Discord.RichEmbed()
  .setColor(0xfffff)
  .setThumbnail(member.user.avatarURL)
  .setTimestamp()
  .addField('New Member!',
    `Welcome to Team Cryptic, ${member.user.username}! Please read #rules and enjoy your stay!!`)
  guild.defaultChannel.send({embed});
  let ROLE = guild.roles.find("name", "FRENCH BAGUETTE");
  (member.addRole(ROLE));
});
client.on('guildMemberRemove', member => {
  let guild = member.guild;
  const embed = new Discord.RichEmbed()
  .setColor(0xfffff)
  .setThumbnail(member.user.avatarURL)
  .setTimestamp()
  .addField('Good bye',
    `${member.user.username} has left.`)
  guild.defaultChannel.send({embed});
});
//ANTI-SWEARING/URLs
client.on('message', message => {
    let filter = ["shit", "SHIT", "fuck", "FUCK", "crap", "CRAP", "niggar", "NIGGAR", "bitch", "BITCH", "asshole", "ASSHOLE"];
    if(filter.some(function(v) { 
        return message.content.indexOf(v) >= 0; 
    })) {
        message.delete();
  const embed = new Discord.RichEmbed()
  .setColor(0xfffff)
  .addField(`${message.author.username}`,
  'Please dont swear')
   message.channel.send({embed});
    };
});
//FAILURE
client.on('message', message => {
    if(message.content.startsWith('.')){
    let filter = ["help", "ping", "roast", "8ball", "say", "music", "play", "leave", "admin", "kick", "ban", "punish", "unpunish", "addRole", "removeRole", "tell", "invite", "purge", "radio", "mod"];
    if(!filter.some(function(v) { 
        return message.content.indexOf(v) >= 0; 
    })) {
    message.reply(`Hey I dont think thats one of my commands, try looking at .help and try again`);
    }
  }
});

//COMMANDS
client.on('message', message =>{
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if(message.channel.type === 'dm') return message.reply("You cant use me in PMs. Sorry!");
  
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);
//HELP
  if (command === "help") {
        const embed = new Discord.RichEmbed()
  .setColor(0xfffff)
  .setFooter(`Made by Cyanite#5749`)
  .addField(`Help`,
  'Hello there ' + message.author.username + ', here are my commands\n' +
  '.help = this command\n' +
  '.ping = to check response time\n' +
  '.roast = get roasted by TC bot\n' +
  '.8ball = ask the magic 8 ball yes or no questions\n' +
  '.say = make the bot say somthing\n'+
  '.prof = shows a list of some info about your self\n' +
  '.invite = invite me to your sever\n' +
  '.music = display music commands\n' +
  '.mod = display list of admin commands __only for moderators__\n' +
  '.admin = display list of admin commands __only for admins__')
   message.channel.send({embed});
  } 
//SAY
  if (command === "say") {
    const embed = new Discord.RichEmbed()
    .setDescription(args.join(" "))
    .setColor(0xfffff)
    message.channel.send({embed});
    message.delete();
  }
//PING-PONG
  if (command === "ping") {
    const embed = new Discord.RichEmbed()
    .setDescription(`:ping_pong: Pong: \`${Date.now() - message.createdTimestamp}ms\``)
    .setColor(0xfffff)
   message.channel.send({embed});
  }
//MAGIC 8-BALL
  if (command === "8ball") {
      if(!args.length > 0) {
      return message.reply('Please ask the magic 8 ball a question')
    }
        var textArray = [
      'You honstly think I care',
      'Yes definitely', 
      'Most likely',
      'Without a doubt',
      'My sources say no',
      'Dont count on it',
      'I didnt quite get that, try again',
      'Ask again later',
      'My reply is no',
      'YES',
      'NO',
      'I do not know',
      'Who knows'
    ];
    var Roast = Math.floor(Math.random()*textArray.length);
    message.reply(`${textArray[Roast]}`)
  }
//ROASTS
  if (command === "roast") {
        if(!args.length > 0) {
      return message.reply('Please add a roast')
    }
        let textArray = [
      'I lost all my fingers but one :middle_finger:',
      'Today I found a penny, it reminded me of you',
      'Scientists say the universe is made up of protons, neutrons and electrons. They forgot one thing, morons like you', 
      "I hate to break it down to you but have you ever realised that 'AWESOME' ends with 'ME' and 'UGLY' starts with 'U'" 
    ];
    var Roast = Math.floor(Math.random()*textArray.length);
    message.reply(`${textArray[Roast]}`)
  }
//ID
  if (command === "prof") {
    const embed = new Discord.RichEmbed()
    .setColor(0xfffff)
    .setAuthor(`${message.author.username}s ID card`)
    .setThumbnail(message.author.avatarURL)
    .addField(`ID`,
              `${message.author.id}`)
    .addField(`Status`,
              `${message.author.presence.status}`)
    .addField(`Nickname`,
              `${message.member.nickname}`)
    .addField(`Game`,
              `${message.author.presence.game.name}`)
              let dude = (message.mentions.members.first());
    message.channel.send(embed)
  };
//INVITE
  if (command === "invite") {
    const embed = new Discord.RichEmbed()
    .setColor(0xfffff)
    .addField(`Invitation link`,
              `Here you are ${message.author.username}, you are free to invite me to your server\n` +
              `https://discordapp.com/oauth2/authorize?&client_id=312506060671811586&scope=bot&permissions=12659727`);
    message.channel.send({embed});
  }
//MUSIC
  if (command === "music") {
        const embed = new Discord.RichEmbed()
  .setColor(0xfffff)
  .addField(`Music`,
  '.play = Use a link or just simply search to play your favorite music\n' +
  '.leave = leaves the channel you are in\n' +
  '.radio = displays different genres of music that can be played')
   message.channel.send({embed});
  }
//PLAY
 if (command === "play"){
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel){
      return message.channel.send(":x: You are not in a voice channel!!");
    }
    if(args[0].startsWith("http")){
    voiceChannel.leave()
	message.channel.send(":white_check_mark: **Connected!**");
    voiceChannel.join()
    .then(connection => {
	const args = message.content.split(" ").slice(1);
      let stream = yt(args.join(" "), {audioonly: true});
      yt.getInfo(args.join(" "), function(err, info) {
      const title = info.title
	  message.channel.send(`Now playing \__${title}\__`)
      })
      const dispatcher = connection.playStream(stream);
      dispatcher.on("end", end => {voiceChannel.leave()});
    });
  } else {
    var opts = {
      maxResults: 1,
      key: 'AIzaSyDcfmwCaQ1KGIU0qiHU8LCH22kdmOnMSAc'
    };
    const voiceChannel = message.member.voiceChannel;
    let args = message.content.slice(6)
    let name = args
    console.log(name)
    search(name, opts, (err, results) => {
      if(err) return console.log(err);
      voiceChannel.leave()
      message.channel.send(":white_check_mark: **Connected!**")
      message.channel.send(`Now playing: __${results[0].title}__`);
      voiceChannel.join()
       .then(connection => {
         const stream = yt(`${results[0].link}`, { filter : 'audioonly' });
              yt.getInfo(`${results[0].link}`, function(err, info) {
            })
         const dispatcher = connection.playStream(stream);
         dispatcher.on("end", end => {voiceChannel.leave()});
       })    
    })
  }
  };
//RADIO-LIST
if (command === `radio`) {
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel){
    return message.channel.send(":x: You must be in a voice channel first!");
  }
const embed = new Discord.RichEmbed()
.setColor(0xfffff)
.addField('What kind of music would you like to listen to?',
  `Chill   Trap   R&B   Rap  Nightcore`)
.setFooter("Genres are CASE SENSITIVE!")
      message.channel.send({embed})
.then(() => {
  message.channel.awaitMessages(response => response.content === 'Chill', {
    max: 1,
    time: 30000,
    errors: ['time'],
  })
  .then((collected) => {
  voiceChannel.leave()
  message.channel.send(":white_check_mark: **Connected!**")
  voiceChannel.join()
   .then(connection => {
     const stream = yt('https://www.youtube.com/watch?v=IW8Okk5SsrE', { filter : 'audioonly' });
          yt.getInfo('https://www.youtube.com/watch?v=IW8Okk5SsrE', function(err, info) {
        message.channel.send(`Now playing: __***CHILL***__`)
        })
     const dispatcher = connection.playStream(stream);
     dispatcher.on("end", end => {voiceChannel.leave()});
   })
    
    })
    .catch(() => {
      message.channel.send('You did not select a genre within the time limit!');
    });

});
message.channel.awaitMessages(response => response.content === 'Trap', {
  max: 1,
  time: 30000,
  errors: ['time'],
})
.then((collected) => {
  voiceChannel.leave()
  message.channel.send(":white_check_mark: **Connected!**")
  voiceChannel.join()
   .then(connection => {
     const stream = yt('https://www.youtube.com/watch?v=daRLyB9rVC4', { filter : 'audioonly' });
          yt.getInfo('https://www.youtube.com/watch?v=daRLyB9rVC4', function(err, info) {
        message.channel.send(`Now playing: __***TRAP***__`)
        })
     const dispatcher = connection.playStream(stream);
     dispatcher.on("end", end => {voiceChannel.leave()});
   })
   .catch(() => {
    message.channel.send('You did not select a genre within the time limit!');
  });
})
message.channel.awaitMessages(response => response.content === 'R&B', {
  max: 1,
  time: 30000,
  errors: ['time'],
})
.then((collected) => {
  voiceChannel.leave()
  message.channel.send(":white_check_mark: **Connected!**")
  voiceChannel.join()
   .then(connection => {
     const stream = yt('https://www.youtube.com/watch?v=fJYhEHGJ5N8', { filter : 'audioonly' });
          yt.getInfo('https://www.youtube.com/watch?v=fJYhEHGJ5N8', function(err, info) {
        message.channel.send(`Now playing: __***R&B***__`)
        })
     const dispatcher = connection.playStream(stream);
     dispatcher.on("end", end => {voiceChannel.leave()});
   })
   .catch(() => {
    message.channel.send('You did not select a genre within the time limit!');
  });
})
message.channel.awaitMessages(response => response.content === 'Rap', {
  max: 1,
  time: 30000,
  errors: ['time'],
})
.then((collected) => {
  voiceChannel.leave()
  message.channel.send(":white_check_mark: **Connected!**")
  voiceChannel.join()
   .then(connection => {
     const stream = yt('https://www.youtube.com/watch?v=Z_HAq7Dl1Ek', { filter : 'audioonly' });
          yt.getInfo('https://www.youtube.com/watch?v=Z_HAq7Dl1Ek', function(err, info) {
        message.channel.send(`Now playing: __***Rap***__`)
        })
     const dispatcher = connection.playStream(stream);
     dispatcher.on("end", end => {voiceChannel.leave()});
   })
   .catch(() => {
    message.channel.send('You did not select a genre within the time limit!');
  });
})
message.channel.awaitMessages(response => response.content === 'Nightcore', {
  max: 1,
  time: 30000,
  errors: ['time'],
})
.then((collected) => {
  voiceChannel.leave()
  message.channel.send(":white_check_mark: **Connected!**")
  voiceChannel.join()
   .then(connection => {
     const stream = yt('https://www.youtube.com/watch?v=CnFHPWbne2k', { filter : 'audioonly' });
          yt.getInfo('https://www.youtube.com/watch?v=CnFHPWbne2k', function(err, info) {
        message.channel.send(`Now playing: __***Nightcore***__`)
        })
     const dispatcher = connection.playStream(stream);
     dispatcher.on("end", end => {voiceChannel.leave()});
   })
   .catch(() => {
    message.channel.send('You did not select a genre within the time limit!');
  });
})
};
//LEAVE CHANNEL
  if (command === "leave") {
      const voiceChannel = message.member.voiceChannel;
      voiceChannel.leave();
  }
//ADMIN
  if (command === "admin") {
  if(!message.member.roles.some(r=>["ADMIN", "SERVER OWNER"].includes(r.name)) ) {
       return message.reply("You dont have permission to use this command");
  }
  const embed = new Discord.RichEmbed()
  .setColor(0xfffff)
  .addField(`ADMIN Commands`,
            '.kick = kick a user\n' +
            '.ban = ban a user\n' +
            '.punish = punish a user\n' +
            '.unpunish = unpunish a user\n' +
            '.addRole = create a new role\n' +
            '.removeRole = delete a role\n' +
            '.tell = tell someone somthing without having to find them in your DMs')
          message.author.send({embed});
  }
//MOD
  if (command === "mod") {
  if(!message.member.roles.some(r=>["MODERATORS", "ADMIN", "SERVER OWNER"].includes(r.name)) ) {
      return message.reply("You dont have permission to use this command");
  }
  if(message.member.roles.some(r=>["ADMIN", "SERVER OWNER"].includes(r.name)) ) {
  return message.reply("You have a higher role than a moderator, use `.admin` to get the full list of commands you can use");
}
  const embed = new Discord.RichEmbed()
  .setColor(0xfffff)
  .addField(`MODERATOR Commands`,
            '.punish = punish a user\n' +
            '.unpunish = unpunish a user\n' +
            '.addRole = create a new role\n' +
            '.removeRole = delete a role\n' +
            '.kick = kick a member\n' +
            '.announce = make an announcement\n')
          message.author.send({embed});
  }
//ANOUNCEMENTS
    if (command === "announce") {
  if(!message.member.roles.some(r=>["ADMIN", "SERVER OWNER", "TRIAL MODERATORS", "MODERATORS"].includes(r.name)) ) {
  return message.reply("You dont have permission to announce");
}
  message.guild.channels.some(r=>["general", "announcements"].includes(r.name)) 
  let announcement = args.join(" ");
  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .addField(`New Announcement by ${message.author.username}`,
  `@everyone ${announcement}`)
    message.delete();
    message.channel.send({embed})
   } 
//TELL
    if (command === "tell") {
  if(!message.member.guild.roles.some(r=>["ADMIN", "SERVER OWNER", "TRIAL MODERATORS", "MODERATORS"].includes(r.name)) ) {
  return message.reply("You dont have permission to tell people things");
}
      let Member = (message.mentions.users.first());
      message.guild.member(Member).send(`__Message From Team Cryptic__: ${args.slice(1).join(" ")}`);
              message.delete();
}
//PURGE
if (command === "purge") {
const user = message.mentions.users.first();
const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
if (!amount) return message.reply('Must specify an amount to delete!');
if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
message.delete();
message.channel.fetchMessages({
 limit: amount,
}).then((messages) => {
 if (user) {
 const filterBy = user ? user.id : Client.user.id;
 messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 }
 message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
});
};
//PUNISH
  if (command === "punish") {
  if(!message.member.roles.some(r=>["ADMIN", "SERVER OWNER", "TRIAL MODERATORS", "MODERATORS"].includes(r.name)) ) {
  return message.reply("You dont have permission to punish people");
}
    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to punish");
    }
let punish = (message.mentions.users.first());
let punishRole = message.guild.roles.find("name", "Punished").id;
      message.guild.member(punish).addRole(punishRole);
      console.log(`${message.author.username} punished, ${punish.username}.`);
const embed = new Discord.RichEmbed()
  .setColor(0xfffff)
  .setTimestamp()
  .setThumbnail(message.member.user.avatarURL)
  .addField(`Punishment`,
  `${message.author.username} punished, ${punish.username}.`)
      message.guild.channels.find("name", "logs").send({embed});
    { 
        message.delete();
    };
  }
//UNPUNISH
  if (command === "unpunish") {
  if(!message.member.roles.some(r=>["ADMIN", "SERVER OWNER", "TRIAL MODERATORS", "MODERATORS"].includes(r.name)) ) {
  return message.reply("You dont have permission to punish people");
}
    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to unpunish");
    }
let punish = (message.mentions.users.first());
let punishRole = message.guild.roles.find("name", "Punished").id;
      message.guild.member(punish).removeRole(punishRole);
      console.log(`${message.author.username} unpunished, ${punish.username}.`);
const embed = new Discord.RichEmbed()
  .setColor(0xfffff)
  .setTimestamp()
  .setThumbnail(message.member.user.avatarURL)
  .addField(`Unpunishment`,
  `${message.author.username} unpunished, ${punish.username}.`)
      message.guild.channels.find("name", "logs").send({embed});
      { 
        message.delete();
    };
  }
//KICK
  if (command === "kick") {
  if(!message.member.roles.some(r=>["ADMIN", "SERVER OWNER"].includes(r.name)) ) {
        return message.reply("You dont have permission to use this command");
      }
    if(message.mentions.members.size === 0) {
      return message.reply("Please mention a user to kick");
    }
    let guild = member.guild;
    let kickMember = (message.mentions.users.first());
      console.log(`${message.author.username} kicked, ${kickMember.username}.`);
const embed = new Discord.RichEmbed()
  .setColor(0xfffff)
  .setTimestamp()
  .setThumbnail(member.user.avatarURL)
  .addField('Kick',
    `${message.author.username} kicked, ${kickMember.username}.`)
  .addField('Reason: ',
  `${args.slice(1).join(" ")}`)
      message.guild.channels.find("name", "logs").send({embed});
      message.guild.member(kickMember).kick();
            { 
        message.delete();
    };
  }
//BAN
  if (command === "ban") {
  if(!message.member.roles.some(r=>["ADMIN", "SERVER OWNER"].includes(r.name)) ) {
        return message.reply("You dont have permission to use this command");
      }
    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to ban");
    }
    if(args.length > 0) {
      return message.reply('Please add a reason')
    }
    let banMember = (message.mentions.users.first());
    let guild = member.guild;
    console.log(`${message.author.username} banned, ${banMember.username}.`);
const embed = new Discord.RichEmbed()
  .setColor(0xfffff)
  .setTimestamp()
  .setThumbnail(member.user.avatarURL)
  .addField(`Ban`,
  `${message.author.username} banned, ${banMember.username}.`)
  .addField('Reason: ',
  `${args.slice(1).join(" ")}`)
      message.guild.channels.find("name", "logs").send({embed});
      message.reply('ok')
      message.guild.member(banMember).ban();
            { 
        message.delete();
    };
  }
  if(command === "makeRole") {
  if(!message.member.roles.some(r=>["ADMIN", "SERVER OWNER", "BOTS"].includes(r.name)) ) {
        return message.reply("You dont have permission to use this command");
      }
    let name = args.join(" ");
    message.guild.createRole({
    name: (`${name}`),
    })
    const embed = new Discord.RichEmbed()
    .setColor(0xfffff)
    .addField(`Role`,
    `Created Role, ${name}`)
     message.channel.send({embed});
    console.log(`${message.author.username}, created a new role called -${name}-`);
  }
  if(command === "addRole") {
  let ROLE = message.guild.roles.find("name", args.slice(1).join(" "));
  let dude = (message.mentions.members.first());
  if(!message.member.roles.some(r=>["ADMIN", "SERVER OWNER", "BOTS"].includes(r.name)) ) {
        return message.reply("You dont have permission to use this command");
      }
    if(message.mentions.users.size === 0) {
      return message.reply(`Please add a role to give to someone`);
    }
    if(message.member.roles.size < 0) {
      return message.reply('Please add a role to add')
    }
  if(message.member.roles.has(ROLE)) {
    return message.reply(`${dude} already has the role`)
  }
      dude.addRole(ROLE);
  message.channel.send(`${message.author.username} gave ${dude} the ${ROLE} Role`)
};
//REMOVE-ROLE
  if(command === "removeRole") {
  let ROLE = message.guild.roles.find("name", args.slice(1).join(" "));
  let dude = (message.mentions.members.first());
  if(!message.member.roles.some(r=>["ADMIN", "SERVER OWNER", "BOTS"].includes(r.name)) ) {
        return message.reply("You dont have permission to use this command");
      }
    if(message.mentions.users.size === 0) {
      return message.reply(`Please add a user to take a role from`);
    }
    if(ROLE.length > 0) {
      return message.reply('Please add a role to remove')
    }
  if(!message.member.roles.has(ROLE.id)) {
    return message.reply(`${dude} doesnt have that role`)
  }
      dude.removeRole(ROLE);
  message.channel.send(`${message.author.username} removed ${dude}s ${ROLE} Role`)
  }
});

client.login('process.env.BOT_TOKEN')
