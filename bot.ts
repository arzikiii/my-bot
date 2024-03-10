import { Bot } from "grammy";

import dotenv from "dotenv";
dotenv.config();

const bot = new Bot(process.env.TELE_BOT_TOKEN as string);

bot.command("start", (ctx) => ctx.reply("Hello, MoJune here!"));

bot.on("message", (ctx) => ctx.reply("Got another message"));

bot.start();
