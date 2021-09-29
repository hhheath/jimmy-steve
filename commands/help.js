exports.help = function (message) {
    const commands = ['help ', 'ping ', 'spam (must end in number) ', 'crypto ', 'coinprice (get the current price of a cryptocurrency by its ticker) ', 'isLive <streamer> '];

    message.channel.send(`All commands must begin with a ! \nHere are the commands: ${commands}`);
}