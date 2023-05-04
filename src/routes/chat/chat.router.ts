import express, { Response } from "express"
import { IncomingMessage } from "http";
import { initExpressCallback } from "../../express/express-callback";
import { PostChatCompletion } from "../../controllers/chat.controller";
import { HTTPResponse } from "../../controllers/HTTPController";

const processDataStream = (httpResponse: HTTPResponse, res: Response) => {
  const stream = httpResponse.body as IncomingMessage;

  stream.on("data", (chunk: Buffer) => {
    // Data stream chunks are delimited by \n\n
    const lines = chunk.toString().split("\n\n")
      .filter(line => line.length > 0 && !line.includes("[DONE]"));

    // Convert chunks to JSON and extract text content
    for (const line of lines) {
      const data = line.replace("data: ", "");
      const json = JSON.parse(data);

      const token = json.choices[0].delta.content;

      // Write data to response stream
      if (token) {
        res.write(token);
      }
    }
  });

  // Close the stream when all data is written
  stream.on("end", () => res.end());
  stream.on("error", err => console.error(err));
}

export const initPostChatCompletionRouter = (
  postChatCompletion = initExpressCallback(
    new PostChatCompletion(),
    processDataStream
  )
) => {
  const router = express.Router();

  router.post("/", postChatCompletion);

  return router;
};

const router = express.Router();

router.use([
  initPostChatCompletionRouter(),
])

export default router;
