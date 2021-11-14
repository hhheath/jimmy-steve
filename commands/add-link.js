/** 
 * this command will add a link to my personal wallabag reading list. 
 * 
 * requirements: 
 * - only from me
 * - only in my personal server
 * 
 */

const auth = require('../auth.json');
const got = require('got');

exports.addLink = async function (message) {
  const postURL = 'https://read.whb.sh/api/entries';
  const options = {
    headers: {
      "Authorization": `Bearer ${auth.wallabag}`
    },
    json: {
      url: `${message.content.slice(5)}`
    }
  }
  
  if (message.content.slice(5, 9) !== 'http') {
    console.log(message.content.slice(5, 9))
    message.channel.send("Error with link");
    return;
  }

  const wallabagRes = await got.post(postURL, options).json().catch((err) => console.log(err));

  if (wallabagRes?.http_status && wallabagRes.http_status === '200') {
    message.channel.send("Link added.");
  } else {
    message.channel.send("Error archiving link.")
  }
  
  console.log(wallabagRes);

}