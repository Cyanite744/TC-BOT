const Discord = require('discord.js');
const client = new Discord.Client();
const yt = require('ytdl-core');

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
    let filter = ["help", "ping", "roast", "8ball", "say", "music", "play", "leave", "radio-list", "radio-1", "radio-2", "radio-3", "radio-4", "radio-5", "admin", "kick", "ban", "punish", "unpunish", "addRole", "removeRole", "tell"];
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
  .addField(`Help`,
  'Hello there ' + message.author.username + ', here are my commands\n' +
  '.help = this command\n' +
  '.ping = to check response time\n' +
  '.roast = get roasted by TC bot\n' +
  '.8ball = ask the magic 8 ball yes or no questions\n' +
  '.say = make the bot say somthing\n'+
  '.music = display music commands\n' +
  '.admin = display list of admin commands __only for admins__\n' +
  '.info-(loopy, cyanite, kyre, tearss, nature, frantic, jerry) = to get a disc of them')
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
//INFO
//INFO JERRY
    if(command === "info-jerry") {
  const embed = new Discord.RichEmbed()
  .setColor(0x800080)
  .addField('Jerry',
    `Hey there im jerry another Admin of Team Cryptic. I play Rainbow six Siege, CS:GO, Tom Clancys Division and Player Unknowns Battle Grounds.`)
  message.channel.send({embed});
    }
//INFO CYANITE
    if(command === "info-cyanite") {
  const embed = new Discord.RichEmbed()
  .setColor(0xFF4400)
  .addField('Cyanite',
    `Hey yo what's good Cyanite here, creator of TC bot also ADMIN, Head Rocket League Player and Head GFX Designer of Team Cryptic. If you have any questions about my bot, need a logo or just wanna talk, im almost always there to answer so feel free to DM me whenever :sunglasses::metal: `)
  message.channel.send({embed});
    }
//INFO L00PY
    if(command === "info-loopy") {
  const embed = new Discord.RichEmbed()
  .setColor(0x1e90ff)
  .addField('L00PY',
    `Sup guys I'm L00PY Owner and Founder of Team Cryptic I wish you guys a warm welcome, I play cs and tonssss of other games I am also the Team Leader of the CS:GO team. Need to talk to me hit me in the dm's:grin: :ok_hand:.`)
  message.channel.send({embed});
    }
//INFO KYRE
    if(command === "info-kyre") {
  const embed = new Discord.RichEmbed()
  .setColor(0x990000)
  .addField('Kyre',
    `Hey guys I'm Kyre, Co Founder of TC Cryptic, I play csgo, the forest and others. My wifi sucks sometimes. Any problems, bugs. I'm here :ok_hand: :yum:`)
  message.channel.send({embed});
    }
//INFO FRANTIC
    if (command === "info-frantic") {
  const embed = new Discord.RichEmbed()
  .setColor(0xFFFFFF)
  .addField('frantic',
    `Suh dude :P, i'm frantic AKA Leon and I play play CS, MG 2.`)
  message.channel.send({embed});
    }
//INFO TEARSS
    if(command === "info-tearss") {
  const embed = new Discord.RichEmbed()
  .setColor(0xF0A30A)
  .addField('tEaRss',
    `Yo sup guyss im tEaRss one of a few Moderators in Team Cryptic, I play some csgo and some other stuff.You cann hook me up if you want to play csgo`)
  message.channel.send({embed});
    }
//INFO NATURE
if (command === "info-nature") {
  const embed = new Discord.RichEmbed()
  .setColor(0x008A00)
  .addField('Nature',
    `Hi i'm Nature I play CS:GO i'm the support in CS:GO Team Cryptic :smiley:`)
  message.channel.send({embed});
    }
//EVAL
client.on('message', message => {
  if(message.author.id !== "272154298077544449") return;
  const prefix = ".";
  const args = message.content.split(" ").slice(1);

  if (message.content.startsWith(prefix + "eval")) {
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.sendCode("xl", clean(evaled));
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
};
//MUSIC
  if (command === "music") {
        const embed = new Discord.RichEmbed()
  .setColor(0xfffff)
  .addField(`Music`,
  '.play = automatically joins the voice channel that you are in and start playing music ex: .play (www.youtubelink.com)\n' +
  '.leave = leaves the channel you are in\n' +
  '.radio-list = displays a list of 24/7 music genres\n' +
  '.radio-1-5 = choose out of 1-5 radios to play from')
   message.channel.send({embed});
  }
//PLAY
 if (command === "play"){
    const voiceChannel = message.member.voiceChannel;
        let filter2 = ["www."];
    if(!filter2.some(function(v) { 
        return message.content.indexOf(v) >= 0; 
    })) { 
        return message.reply('please add a link')
    }
    if (!voiceChannel){
      return message.channel.send(":x: You are not in a voice channel!!");
    }
	message.channel.send(":white_check_mark: **Connected!**");
    voiceChannel.join()
    .then(connection => {
	const args = message.content.split(" ").slice(1);
      let stream = yt(args.join(" "), {audioonly: true});
      yt.getInfo(args.join(" "), function(err, info) {
      const title = info.title
	  message.channel.send(`Now playing \`${title}\``)
      })
      const dispatcher = connection.playStream(stream);
      dispatcher.on("end", end => {voiceChannel.leave()});
    });
  };
//RADIO-1
  if (command === "radio-1") {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel){
      return message.channel.send(":x: You must be in a voice channel first!");
    }
voiceChannel.join()
 .then(connection => {
   const stream = yt('https://www.youtube.com/watch?v=IW8Okk5SsrE', { filter : 'audioonly' });
        yt.getInfo('https://www.youtube.com/watch?v=IW8Okk5SsrE', function(err, info) {
      message.channel.send(`Now playing: __***CHILL***__`)
      })
   const dispatcher = connection.playStream(stream);
 })
  }
//RADIO-2
  if (command === "radio-2") {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel){
      return message.channel.send(":x: You must be in a voice channel first!");
    }
voiceChannel.join()
 .then(connection => {
   const stream = yt('https://www.youtube.com/watch?v=daRLyB9rVC4', { filter : 'audioonly' });
        yt.getInfo('https://www.youtube.com/watch?v=daRLyB9rVC4', function(err, info) {
      message.channel.send(`Now playing: __***TRAP***__`)
      })
   const dispatcher = connection.playStream(stream);
 })
  }
//RADIO-3
    if (command === "radio-3") {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel){
      return message.channel.send(":x: You must be in a voice channel first!");
    }
voiceChannel.join()
 .then(connection => {
   const stream = yt('https://www.youtube.com/watch?v=fJYhEHGJ5N8', { filter : 'audioonly' });
        yt.getInfo('https://www.youtube.com/watch?v=fJYhEHGJ5N8', function(err, info) {
      message.channel.send(`Now playing: __***R&B***__`)
      })
   const dispatcher = connection.playStream(stream);
 })
  }
//RADIO-4
    if (command === "radio-4") {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel){
      return message.channel.send(":x: You must be in a voice channel first!");
    }
voiceChannel.join()
 .then(connection => {
   const stream = yt('https://www.youtube.com/watch?v=Z_HAq7Dl1Ek', { filter : 'audioonly' });
        yt.getInfo('https://www.youtube.com/watch?v=Z_HAq7Dl1Ek', function(err, info) {
      message.channel.send(`Now playing: __***RAP***__`)
      })
   const dispatcher = connection.playStream(stream);
 })
  }
//RADIO-5
    if (command === "radio-5") {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel){
      return message.channel.send(":x: You must be in a voice channel first!");
    }
voiceChannel.join()
 .then(connection => {
   const stream = yt('https://www.youtube.com/watch?v=CnFHPWbne2k', { filter : 'audioonly' });
        yt.getInfo('https://www.youtube.com/watch?v=CnFHPWbne2k', function(err, info) {
      message.channel.send(`Now playing: __***NIGHTCORE***__`)
      })
   const dispatcher = connection.playStream(stream);
 })
  }
//RADIO-LIST
  if (command === "radio-list") {
      const embed = new Discord.RichEmbed()
  .setAuthor('Radio-List')
  .setColor(0xfffff)
  .setTimestamp()
  .addField('.radio-1',
    `Chill`)
  .addField('.radio-2',
    'Trap')
  .addField('.radio-3',
    'R&B')
  .addField('.radio-4',
    'Rap')
  .addField('.radio-5',
    'Nightcore')
  .addField('Feedback',
  'If you would like another genre or a radio isnt working please message __Cyanite#5749__')
  message.channel.send({embed});
  }
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
  if (command === "mod") {
  if(!message.member.roles.some(r=>["MODERATORS", "ADMIN", "SERVER OWNER"].includes(r.name)) ) {
      return message.reply("You dont have permission to use this command");
  }
  if(!message.member.roles.some(r=>["ADMIN", "SERVER OWNER"].includes(r.name)) ) {
  return message.reply("You have a higher role than a moderator, use `.admin` to get the full list of command you can use");
}
  const embed = new Discord.RichEmbed()
  .setColor(0xfffff)
  .addField(`MODERATOR Commands`,
            '.punish = punish a user\n' +
            '.unpunish = unpunish a user\n' +
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
    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to kick");
    }
    if(args.length > 0) {
      return message.reply('Please add a reason')
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
    message.channel.send(`Created role, ${name}`);
    console.log(`${message.author.username}, created a new role called -${name}-`);
  }
  if(command === "addRole") {
  let ROLE = message.guild.roles.find("name", args.join(" "));
  let dude = (message.mentions.users.first());
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
  message.guild.member(dude).addRole(ROLE);
  message.channel.send(`${message.author.username} gave ${dude} the ${ROLE} Role`)
}
  if(command === "removeRole") {
  let ROLE = message.guild.roles.find("name", args.join(" "));
  let dude = (message.mentions.users.first());
  if(!message.member.roles.some(r=>["ADMIN", "SERVER OWNER", "BOTS"].includes(r.name)) ) {
        return message.reply("You dont have permission to use this command");
      }
    if(message.mentions.users.size === 0) {
      return message.reply(`Please add a user to take a role from`);
    }
    if(ROLE.length > 0) {
      return message.reply('Please add a role to remove')
    }
  if(message.member.roles.has(ROLE.id)) {
    return message.reply(`${dude} doesnt have that role`)
  }
  message.guild.member(dude).addRole(ROLE);
  message.channel.send(`${message.author.username} removed ${dude}s ${ROLE} Role`)
  }
});
  
client.login('process.env.BOT_TOKEN')
