import express from "express"
import { PostConversation } from "../../controllers/conversation.controller";
import { initExpressCallback } from "../../express/express-callback";

export const initPostConversationRouter = (
  postConversation = initExpressCallback(new PostConversation())
) => {
  const router = express.Router();

  router.post("/", postConversation);

  return router;
};

const router = express.Router();

router.use([
  initPostConversationRouter(),
]);

export default router;
