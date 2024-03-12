import type { Conversation, ConversationFlavor } from "@grammyjs/conversations";
import type { Context, SessionFlavor } from "grammy";

export interface SessionData {
  todo: string;
}

export type MyContext = Context & ConversationFlavor & SessionFlavor<SessionData>;
export type MyConversation = Conversation<MyContext>;
