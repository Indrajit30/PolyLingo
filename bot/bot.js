require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const BOT_PREFIX = "!";
const DEVNEST_COMMAND = "polylingo";
const DEVNEST_HELP_COMMAND = "polylingohelp";

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.API_KEY;
const Modelclient = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const genAI = new GoogleGenerativeAI(API_KEY);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

async function giveResponse(userMessage) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const result = await model.generateContent(userMessage);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text
}

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return; // Ignore messages from other bots

  // Check for the !devnest command
  if (msg.content.toLowerCase() === `${BOT_PREFIX}${DEVNEST_COMMAND}`) {
    msg.reply("Hey there, how can I help you? To ask me a question,make sure to use !polylingohelp before your question😊");
  }

  // Check for the !devnesthelp command
  if (
    msg.content.toLowerCase().startsWith(`${BOT_PREFIX}${DEVNEST_HELP_COMMAND}`)
  ) {
    msg.reply("On it,this might take a few seconds...");

    const userMessage = msg.content.substring(
      `${BOT_PREFIX}${DEVNEST_HELP_COMMAND}`.length + 1
    );
    const response = await giveResponse(userMessage);
    if (response.length > 2000) {
        msg.reply("Maybe try summarizing the question? The response is too long to send in a single message.");
      } else {
        msg.reply(response);
      }
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);
