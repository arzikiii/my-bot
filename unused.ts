// const menu = new Menu("my-menu-identifier")
//   .text("A", (ctx) => ctx.reply("You pressed A!"))
//   .row()
//   .text("B", (ctx) => ctx.reply("You pressed B!"));
// // Make it interactive.
// bot.use(menu);

// const main = new Menu("root-menu")
//   .text("Welcome", (ctx) => ctx.reply("Hi!"))
//   .row()
//   .submenu("Credits", "credits-menu");

// const settings = new Menu("credits-menu").text("Show Credits", (ctx) => ctx.reply("Powered by grammY")).back("Go Back");

// main.register(settings);
// // main.register(settings, "back-from-settings-menu");

// bot.use(main);

// bot.on(["message", "edited_message"], async (ctx) => {
//   const spontan = ctx.message?.text?.includes("spontan");
//   if (spontan) {
//     ctx.reply("uhuyyy", {
//       reply_parameters: { message_id: ctx.msg!.message_id },
//       message_thread_id: 348,
//     });
//   }

//   if (Number(ctx.message?.from.id) === 2129027862) {
//     ctx.reply("Halo ayang", {
//       reply_parameters: { message_id: ctx.msg!.message_id },
//       message_thread_id: ctx.update.message?.message_thread_id,
//     });
//     console.log(JSON.stringify(ctx, null, 2));
//     console.log("log ctx");
//   }

//   console.log(JSON.stringify(ctx.update, null, 2));
//   //   await bot.api.sendMessage(2129027862, "Bot responded to message");
// });
