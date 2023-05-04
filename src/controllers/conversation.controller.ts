import { ChatCompletionRole } from "../entities/Conversation";
import { CreateConversation } from "../use-cases/conversation.use-case";
import { HTTPController, HTTPRequest, HTTPResponse, HTTPResponseStatus } from "./HTTPController";

export class PostConversation implements HTTPController {
  private _createConversation: CreateConversation;

  constructor(createConversation = new CreateConversation()) {
    this._createConversation = createConversation;
  }

  async processRequest(request: Pick<HTTPRequest, "body">): Promise<HTTPResponse> {
    const { prompt } = request.body;
    const conversation = await this._createConversation.execute({
      title: prompt,
      messages: [
        { role: ChatCompletionRole.USER, content: prompt },
      ],
    });

    return {
      statusCode: HTTPResponseStatus.Created,
      body: conversation,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
}
