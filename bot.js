"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const menu_1 = require("@grammyjs/menu");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bot = new grammy_1.Bot(process.env.TELE_BOT_TOKEN);
console.log("bot started!");
// const keyboard = new InlineKeyboard.url("Super Shy!");
const menu = new menu_1.Menu("my-menu-identifier")
    .text("Greet Me!", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    console.log(ctx);
    ctx.reply(`Hi! ${(_c = (_b = (_a = ctx.update) === null || _a === void 0 ? void 0 : _a.callback_query) === null || _b === void 0 ? void 0 : _b.from) === null || _c === void 0 ? void 0 : _c.first_name}`, {
        reply_parameters: { message_id: ctx.msg.message_id },
        message_thread_id: 348,
    });
}))
    .row()
    .url("Super Shy?", "https://www.youtube.com/watch?v=ArmDp-zijuc&pp=ygUJc3VwZXIgc2h5")
    .text("Who are you?", (ctx) => {
    var _a;
    return ctx.reply(`My name is ${(_a = ctx.me) === null || _a === void 0 ? void 0 : _a.first_name}`, {
        reply_parameters: { message_id: ctx.msg.message_id },
        message_thread_id: 348,
    });
})
    .text("Can i See you?", (ctx) => {
    ctx.replyWithPhoto(new grammy_1.InputFile("hanni.jpg"), { message_thread_id: 348, caption: "Ofcourse honey!", reply_parameters: { message_id: ctx.msg.message_id } });
});
bot.use(menu);
bot.command("start", (ctx) => {
    var _a;
    if (Number((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.message_thread_id) === 348) {
        ctx.reply("Hello World!", {
            reply_parameters: { message_id: ctx.msg.message_id },
        });
    }
});
bot.command("greet", (ctx) => {
    ctx.reply("Halo Ayang, Check this out!", {
        reply_parameters: { message_id: ctx.msg.message_id },
        reply_markup: menu,
    });
});
bot.on("message").hears(/(spontan)/g, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    if (((_e = (_d = ctx.message) === null || _d === void 0 ? void 0 : _d.chat) === null || _e === void 0 ? void 0 : _e.type) === "supergroup")
        ctx.reply("uhuyyy", {
            reply_parameters: { message_id: ctx.msg.message_id },
            message_thread_id: 348,
        });
    console.log(ctx.message.from);
}));
bot.on("message").hears(/(gacor)/g, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    if (((_g = (_f = ctx.message) === null || _f === void 0 ? void 0 : _f.chat) === null || _g === void 0 ? void 0 : _g.type) === "supergroup")
        ctx.reply("Menyala abangkuhhhh 🔥👊🏼", {
            reply_parameters: { message_id: ctx.msg.message_id },
            message_thread_id: 348,
        });
    console.log(ctx.message.from);
}));
bot.start({ drop_pending_updates: true });
