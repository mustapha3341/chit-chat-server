import express from "express";
import http from "http";
import socket from "socket.io";

import config from "./config";
import setupMiddleware from "./middleware";
import { connectDatabase } from "./db";
import { restRouter } from "./api/resources/rest-router";

const app = express();
const server = http.createServer(app);
const io = new socket.Server(server);

setupMiddleware(app);
connectDatabase(config)
    .then(() => console.log("Connected to database"))
    .catch((error) => console.log("Error connecting to database..." + error));

app.use("/api", restRouter);

app.all("*", (req, res) => {
    res.json({
        ok: true,
    });
});

io.on("connection", (socket) => {
    console.log("client connected");
    socket.on("disconnect", () => {
        console.log("client disconnected");
    });
});

server.listen(config.port, () => {
    console.log("server listening on port " + config.port);
});
