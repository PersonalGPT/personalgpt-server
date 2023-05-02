import express from "express";
import { IncomingMessage } from "http";
import { Configuration, OpenAIApi } from "openai";

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

router.post("/chat", async (req, res) => {
  const { messages } = req.body;
  console.log(messages);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    stream: true,
  }, {
    responseType: "stream",
  });

  const stream = completion.data as unknown as IncomingMessage;

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
});

export default router;
