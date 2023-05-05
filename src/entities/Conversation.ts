import { randomUUID } from "crypto";

export enum ChatCompletionRole {
  SYSTEM = "system",
  USER = "user",
  ASSISTANT = "assistant",
}

export interface ChatCompletionMessage {
  role: ChatCompletionRole;
  content: string;
  name?: string;
}

export type Conversation = {
  id: string;
  title: string;
  messages: ChatCompletionMessage[];
}

export const createNewConversation = ({
  title = "New Conversation",
  messages = [],
}: Partial<Conversation>): Readonly<Conversation> =>
  Object.freeze({
    id: randomUUID(),
    title,
    messages,
  });
