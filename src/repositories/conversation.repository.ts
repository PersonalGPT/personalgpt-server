import { Conversation } from "../entities/Conversation";
import { ConversationRepository } from "./ConversationRepository";

const db = new Map<string, Conversation>();

export class InMemoryConversationRepository implements ConversationRepository {
  async insert(item: Conversation): Promise<boolean> {
    try {
      db.set(item.id, item);
      return true;
    }
    catch (err) {
      console.error(err);
      return false;
    }
  }
}