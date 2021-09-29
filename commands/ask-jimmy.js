const got = require("got");

const oaiToken = require("../auth.json");

exports.askJimmy = async function (message) {
  const messageContent = message.content.slice(10);
  const response = await got
    .post(`https://api.openai.com/v1/engines/davinci/completions`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${oaiToken.openAi_token}`,
      },
      json: {
        "prompt": "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
        "temperature": 0.9,
        "max_tokens": 150,
        "top_p": 1,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.6,
        "stop": ["\n", " Human:", " AI:"]
      },
    })
    .json()
    .catch((err) => {
      console.error(err);
    });
  // message.channel.send(response.choices[0].text);
  console.log(response)
};
