import { Bot, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import type { MyContext, MyConversation } from "./types";
import dotenv from "dotenv";
dotenv.config();

export const bot = new Bot<MyContext>(process.env.TELE_BOT_TOKEN as string);
// Install the session plugin.
bot.use(session({ initial: () => ({ todo: "" }) }));
bot.use(conversations());

console.log("bot started!");

const data: { todo?: string; status?: boolean }[] = [];

const showTodos = async (ctx: MyContext, type: "read" | "update" | "delete") => {
  if (type === "read")
    await ctx.reply(`Here's your todo list! ${data.map((val, idx) => `\n${idx + 1}.  ${val.todo}  ${val.status ? "✅" : "❌"}`)}`, {
      reply_parameters: { message_id: ctx.msg!.message_id },
    });
  if (type === "update")
    await ctx.reply(`Here's your todo list! ${data.map((val, idx) => `\n${idx + 1}.  ${val.todo}  ${val.status ? "✅" : "❌"}`)}\n type the id you want to update. type /cancel to cancel`, {
      reply_parameters: { message_id: ctx.msg!.message_id },
    });
  if (type === "delete")
    await ctx.reply(`Here's your todo list! ${data.map((val, idx) => `\n${idx + 1}.  ${val.todo}  ${val.status ? "✅" : "❌"}`)}\n type the id you want to delete. type /cancel to cancel`, {
      reply_parameters: { message_id: ctx.msg!.message_id },
    });
};

const addTodo = async (conversation: MyConversation, ctx: MyContext) => {
  await ctx.reply("type your todo name. type /cancel to cancel", {
    reply_parameters: { message_id: ctx.msg!.message_id },
  });
  const { message } = await conversation.wait();
  if (message?.text === "/cancel") {
    ctx.reply("okay nevermind", {
      reply_parameters: { message_id: ctx.msg!.message_id },
    });
    return;
  }
  data.push({ todo: message?.text, status: false });
  await ctx.reply(`Your todo has successfully listed. type /todos to see your list`, {
    reply_parameters: { message_id: ctx.msg!.message_id },
  });
};

const updateTodo = async (conversation: MyConversation, ctx: MyContext) => {
  if (data.length > 0) {
    await showTodos(ctx, "update");
    const { message } = await conversation.wait();
    if (message?.text === "/cancel") {
      ctx.reply("okay nevermind", {
        reply_parameters: { message_id: ctx.msg!.message_id },
      });
      return;
    }
    data[Number(message?.text!) - 1].status = !data[Number(message?.text!) - 1].status;
    await showTodos(ctx, "read");
  } else
    await ctx.reply("You dont have any list yet! insert with /create", {
      reply_parameters: { message_id: ctx.msg!.message_id },
    });
};

const deleteTodo = async (conversation: MyConversation, ctx: MyContext) => {
  if (data.length > 0) {
    await showTodos(ctx, "delete");
    const { message } = await conversation.wait();
    if (message?.text === "/cancel") {
      ctx.reply("okay nevermind", {
        reply_parameters: { message_id: ctx.msg!.message_id },
      });
      return;
    }
    data.splice(Number(message?.text!) - 1, 1);
    await showTodos(ctx, "read");
  } else
    await ctx.reply("You dont have any list yet! insert with /create", {
      reply_parameters: { message_id: ctx.msg!.message_id },
    });
};

bot.use(createConversation(addTodo));
bot.use(createConversation(updateTodo));
bot.use(createConversation(deleteTodo));

bot.command("start", (ctx) => {
  ctx.reply("Hello World!", {
    reply_parameters: { message_id: ctx.msg!.message_id },
  });
});

bot.command("create", async (ctx) => {
  await ctx.conversation.enter("addTodo");
});

bot.command("update", async (ctx) => {
  await ctx.conversation.enter("updateTodo");
});

bot.command("delete", async (ctx) => {
  await ctx.conversation.enter("deleteTodo");
});

bot.command("todos", async (ctx) => {
  if (data.length > 0) {
    showTodos(ctx, "read");
  } else {
    ctx.reply("You dont have any list yet! insert with /create", {
      reply_parameters: { message_id: ctx.msg!.message_id },
    });
  }
});
