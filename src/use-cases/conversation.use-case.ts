import { Conversation, createNewConversation } from "../entities/Conversation";
import { ConversationRepository } from "../repositories/ConversationRepository";
import { InMemoryConversationRepository } from "../repositories/conversation.repository";
import { UseCase } from "./UseCase";

export class GetAllConversationsUseCase implements UseCase<Conversation[]> {
  private _conversationRepo: ConversationRepository;

  constructor(conversationRepo = new InMemoryConversationRepository()) {
    this._conversationRepo = conversationRepo;
  }

  async execute(): Promise<Conversation[]> {
    return await this._conversationRepo.getAll();
  }
}

export class CreateConversation implements UseCase<Conversation> {
  private _conversationRepo: ConversationRepository;

  constructor(conversationRepo = new InMemoryConversationRepository()) {
    this._conversationRepo = conversationRepo;
  }

  async execute(payload: Partial<Conversation>): Promise<Conversation> {
    const conversation = createNewConversation(payload);

    await this._conversationRepo.insert(conversation);
    return conversation;
  }
}
