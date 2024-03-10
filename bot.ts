import { Bot } from "grammy";

import dotenv from "dotenv";
dotenv.config();

const bot = new Bot(process.env.TELE_BOT_TOKEN as string);

bot.command("start", (ctx) => ctx.reply("Hello, MoJune here!"));

bot.on(["message", "edited_message"], (ctx) => {
  ctx.reply("We got another message");
});

// bot.on(["message", "edited_message"], (ctx) => {
//   const msg = ctx.message
//   ctx.reply("Got another message");
// });

bot.start();
