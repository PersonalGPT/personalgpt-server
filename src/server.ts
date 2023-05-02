import express from "express";

const server = express();

server.get("/health", (req, res) => {
  res.status(200).send("Healthy!");
});

export default server;
