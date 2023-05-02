import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const server = express();

server.use(cors());
server.use(helmet());
server.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    skip: (req, res) => process.env.NODE_ENV === "test",
  })
);

server.get("/health", (req, res) => {
  res.status(200).send("Healthy!");
});

export default server;
