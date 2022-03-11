// This is the server backend
(function main() {
    // Build server
    const serverItems   = createServer();
    const express       = serverItems.express;
    const app           = serverItems.app;
    const http          = serverItems.http;
    const server        = serverItems.server;
    const io            = serverItems.io;

    // Do actions
    io.on('connection', (socket) => {
        console.log('a user connected');
        // const nickname = recvNickname(io, server);
        manageMessage(io, socket);
        
        socket.on('disconnect', () => {
          console.log('user diconnected');
        });
    });
    listen(server);
})();

function createServer() {
    const express = require('express');
    const app = express();
    const http = require('http');
    const server = http.createServer(app);
    const { Server } = require("socket.io");
    const io = new Server(server);
    const serverItems = {
        "express": express, 
        "app": app,
        "http": http, 
        "server": server,
        "io": io
    };

    app.get('/', (req, res) => {
          res.sendFile(__dirname + '/index.html');
    });

    return serverItems;
}

function recvNickname(io, server) {
    socket.on('nickname', (nickname) => {
        return nickname;
    });
}

function manageMessage(io, socket) {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
}

function listen(server) {
    server.listen(3000, () => {
        console.log('listening on *:3000');
    });
}

// Use this code to display when someone disconnects
