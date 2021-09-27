// this command will reply whether or not a streamer is live, and with a link to that streamer
const auth = require('../auth.json');
const got = require('got');

exports.isLive = async function (message) {
  const streamer = message.content.slice(8); // !isLive plus the space

  const url = `https://api.twitch.tv/helix/streams?user_login=${streamer}`;

  console.log(streamer);

  const options = {
    headers: {
      "Authorization": `Bearer ${auth.twitch_token}`,
      "Client-Id": auth.twitch_clientId
    }
  }

  const channelResponse = await got(url, options).json().catch((err) => { console.error(err) });

  console.log(channelResponse)

  if (channelResponse.data.length > 0 && channelResponse.data[0].type === "live") {
    // streamer is live
    message.channel.send(`${streamer} is live! They're playing: **${channelResponse.data[0].game_name}**. Check it out here: https://twitch.tv/${streamer}`)
  } else {
    message.channel.send("Either streamer isn't live, or you mispelled their name.")
  }
}