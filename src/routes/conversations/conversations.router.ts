import express from "express"
import { randomUUID } from "crypto";

const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  console.log("create new conversation with prompt %s", prompt);
  const conversation = {
    id: randomUUID(),
    title: prompt,
    messages: [
      { role: "user", content: prompt }
    ],
  };

  res.status(201).json(conversation);
});

export default router;
