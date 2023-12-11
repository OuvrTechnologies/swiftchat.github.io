const dotenv = require('dotenv');
dotenv.config();

const { Client, MessageEmbed } = require('discord.js');
const axios = require('axios');

const keepAlive = require('./server.js');
keepAlive();

const channel_id = "1177193645284278333"; // Replace with your channel ID
const brainshopApiConfig = {
  bid: YOURbrainID,
  key: YOURAPIKEY,
  uid: 1,
};

const client = new Client({
  disableEveryone: true
});

client.on('message', async (message) => {
  if (!message.guild || message.author.bot || message.channel.id !== channel_id) return;

  try {
    const response = await axios.get(`http://api.brainshop.ai/get`, {
      params: {
        bid: brainshopApiConfig.bid,
        key: brainshopApiConfig.key,
        uid: brainshopApiConfig.uid,
        msg: encodeURIComponent(message.content),
      },
    });

    message.reply(response.data.cnt);
  } catch (error) {
    handleErrorResponse('Bot error, please try again!', message, error);
  }
});

client.on('ready', () => {
  console.clear();
  console.log(`${client.user.tag} is online!`);
});

client.login(process.env.TOKEN);

function handleErrorResponse(text, message, error) {
  console.error(error); // Log the error for debugging

  const errorEmbed = new MessageEmbed()
    .setColor("#FF7676")
    .setDescription(`**❌ | ${text} **`);

  message.channel.send(errorEmbed);
}
