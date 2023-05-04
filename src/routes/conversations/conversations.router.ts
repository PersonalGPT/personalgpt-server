import express from "express"
import { GetAllConversationsController, PostConversation } from "../../controllers/conversation.controller";
import { initExpressCallback } from "../../express/express-callback";

export const initGetAllConversationsRouter = (
  getAllConversations = initExpressCallback(new GetAllConversationsController())
) => {
  const router = express.Router();

  router.get("/", getAllConversations);

  return router;
};

export const initPostConversationRouter = (
  postConversation = initExpressCallback(new PostConversation())
) => {
  const router = express.Router();

  router.post("/", postConversation);

  return router;
};

const router = express.Router();

router.use([
  initGetAllConversationsRouter(),
  initPostConversationRouter(),
]);

export default router;
