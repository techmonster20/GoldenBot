const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
 
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do.");
  if(!args[0]) {
const errEmbed = new Discord.RichEmbed()
.setColor(0xFF0000)
.setAuthor('ERROR')
.setTitle(`:exclamation: Usage: **warn <@Member> <Reason>**`);
message.channel.send({embed: errEmbed})
return;
}

let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

if(!rUser) return errors.cantfindUser(message.channel);

let rreason = args.join(" ").slice(22);

if(!rreason) return errors.noReason(message.channel);



let reportEmbed = new Discord.RichEmbed()

.setDescription("~Warning~")
.setColor("#ff6200")
.addField("Warned User", `${rUser} with ID: ${rUser.id}`)
.addField("Warned By", `${message.author} with ID: ${message.author.id}`)
.addField("Warned in Channel", message.channel)
.addField("Time", message.createdAt)
.addField("Reason", rreason);

let reportschannel = message.guild.channels.find(`name`, "mod-log");

if(!reportschannel) return message.channel.send("Couldn't find mod-log channel.");

const sayMessage = args.join(" ");
// Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
message.delete().catch(O_o=>{});
// And we get the bot to say the thing:

reportschannel.send(reportEmbed);

}