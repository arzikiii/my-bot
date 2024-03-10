import { Bot, InlineKeyboard, InputFile, session } from "grammy";
import { Menu } from "@grammyjs/menu";
import dotenv from "dotenv";
import { Input } from "telegraf";
import { fmtCaption } from "telegraf/typings/core/helpers/util";
dotenv.config();

const bot = new Bot(process.env.TELE_BOT_TOKEN as string);
console.log("bot started!");
// const keyboard = new InlineKeyboard.url("Super Shy!");

const menu = new Menu("my-menu-identifier")
  .text("Greet Me!", async (ctx) => {
    console.log(ctx);
    ctx.reply(`Hi ${ctx.update?.callback_query?.from?.first_name}!`, {
      reply_parameters: { message_id: ctx.msg!.message_id },
      message_thread_id: 348,
    });
  })
  .row()
  .url("Super Shy?", "https://www.youtube.com/watch?v=ArmDp-zijuc&pp=ygUJc3VwZXIgc2h5")
  .text("Who are you?", (ctx) =>
    ctx.reply(`My name is ${ctx.me?.first_name}`, {
      reply_parameters: { message_id: ctx.msg!.message_id },
      message_thread_id: 348,
    })
  )
  .text("Can i See you?", (ctx) => {
    ctx.replyWithPhoto(new InputFile("hanni.jpg"), { message_thread_id: 348, caption: "Ofcourse honey!", reply_parameters: { message_id: ctx.msg!.message_id } });
  });
bot.use(menu);

bot.command("start", (ctx) => {
  if (Number(ctx.message?.message_thread_id) === 348) {
    ctx.reply("Hello World!", {
      reply_parameters: { message_id: ctx.msg!.message_id },
    });
  }
});

bot.command("greet", (ctx) => {
  ctx.reply("Halo Ayang, Check this out!", {
    reply_parameters: { message_id: ctx.msg!.message_id },
    reply_markup: menu,
  });
});

bot.on("message").hears(/(spontan)/g, async (ctx) => {
  if (ctx.message?.chat?.type === "supergroup")
    ctx.reply("uhuyyy", {
      reply_parameters: { message_id: ctx.msg!.message_id },
      message_thread_id: 348,
    });
});

bot.on("message").hears(/(gacor)/g, async (ctx) => {
  if (ctx.message?.chat?.type === "supergroup")
    ctx.reply("Menyala abangkuhhhh 🔥👊🏼", {
      reply_parameters: { message_id: ctx.msg!.message_id },
      message_thread_id: 348,
    });
});

bot.start({ drop_pending_updates: true });
