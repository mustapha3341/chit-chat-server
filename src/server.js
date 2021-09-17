import express from "express";
import http from "http";
import socket from "socket.io";
import morgan from "morgan";
import config from "./config";

const app = express();
const server = http.createServer(app);
const io = new socket.Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

io.on("connection", (socket) => {
    console.log("client connected");
    socket.on("disconnect", () => {
        console.log("client disconnected");
    });
});

server.listen(config.port, () => {
    console.log("server listening on port " + config.port);
});
