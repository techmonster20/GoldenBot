const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const fs = require('fs');
const APP = require('./package.json');


client.on('ready', () => {
  console.log('I am ready')
client.user.setStatus('Online')
console.log('Status set to Online')
client.user.setActivity('*help | Developed by Techmonster')




// Begining of CMD Handler

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
});

// Create new folder named "commands" and add files for each command, example for command google, create a file named "google.js", must be in the folder "commands".
// each command file must have module.exports.run = (client, message, args) => { // code here }; and //

//exports.conf = { aliases: [] }; exports.help = { name: 'tag', description: '', usage: 'tag <name>'};
// Example:
// module.exports.run = (client, message, args) => {
// message.channel.send('example');
// };
// exports.conf = {
// aliases: ['example', 'chexample']
// };

// exports.help = {
// name: 'example', description: 'hello this is description', usage: 'example'
// };


// END OF CMD HANDLER


});

let prefix = `*`;



client.login(process.env.BOT_TOKEN);
