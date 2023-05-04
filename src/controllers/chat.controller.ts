import { IncomingMessage } from "http";
import { HTTPController, HTTPRequest, HTTPResponse, HTTPResponseStatus } from "./HTTPController";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export class PostChatCompletion implements HTTPController {
  async processRequest(request: Pick<HTTPRequest, "body">): Promise<HTTPResponse> {
    const { messages } = request.body;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      stream: true,
    }, {
      responseType: "stream",
    });

    const stream = completion.data as unknown as IncomingMessage;

    return {
      statusCode: HTTPResponseStatus.OK,
      body: stream,
      headers: {
        "Content-Type": "text/event-stream",
      },
    };
  }
}
