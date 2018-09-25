const Discord = require("discord.js");
const os = require('os');
const arch = os.arch()
const used = process.memoryUsage().heapUsed / 1024 / 1024;

module.exports.run = async (client, message, args) => {
    let totalSeconds = process.uptime();
    let realTotalSecs = Math.floor(totalSeconds % 60);
    let days = Math.floor((totalSeconds % 31536000) / 86400);
    let hours = Math.floor((totalSeconds / 3600) % 24);
    let mins = Math.floor((totalSeconds / 60) % 60);
    var ping = client.ping

let embed = new Discord.RichEmbed()
.setTitle("Bot Status")
.setColor("#64DD17")
.addField("Memory Usage", `${Math.round(used * 100) / 100}MB`)
.addField("Ping", `${ping}`)
.addField("Bot Uptime", `Days: ${days} | Hours: ${hours} | Minutes: ${mins} | Seconds: ${realTotalSecs}`)
.addField("Node Version", `${process.version}`)
.addField("Platform", `${os.platform}`)
.addField("In Servers", `${client.guilds.size}`)
.addField("Users", `${client.users.size}`)

message.channel.send(embed)
}

