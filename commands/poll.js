const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do.");
      if(!args[0]) {
    const errEmbed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setAuthor('ERROR')
    .setTitle(`:exclamation: Usage: **&poll <Question>**`);
    message.channel.send({embed: errEmbed})
    return;
  }

      if (!message.member.hasPermission('MANAGE_MESSAGES') && message.author.id !== '357555941215961099') return message.channels.send('Sorry, you don\'t have permission to create poll!').then(msg => msg.delete({timeout: 10000}));
      if (!args.join(' ')) return message.channel.send('Usage: poll <title>').then(msg => msg.delete({timeout: 10000}));

        let embed = new Discord.RichEmbed()
        .setTitle(args.join(' '))
        .setFooter('React to vote on Poll!')
        .setColor('#7289DA')
        const pollTitle = await message.channel.send({ embed });
          await pollTitle.react(`✅`);
          await pollTitle.react(`⛔`);

        const filter = (reaction) => reaction.emoji.name === '✅';
        const collector = pollTitle.createReactionCollector(filter, { time: 15000 });
          collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
          collector.on('end', collected => console.log(`Collected ${collected.size} items`));

        const filter1 = (reaction) => reaction.emoji.name === '⛔';
        const collector1 = pollTitle.createReactionCollector(filter1, { time: 15000 });
          collector1.on('collect', r => console.log(`Collected ${r.emoji.name}`));
          collector1.on('end', collected => console.log(`Collected ${collected.size} items`));

          const sayMessage = args.join(" ");
          // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
          message.delete().catch(O_o=>{});
          // And we get the bot to say the thing:
    };
