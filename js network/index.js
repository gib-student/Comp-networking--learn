function createServer() {
    const app = require('express')();
    const http = require('http').Server(app);
    const io = require('socket.io')(http);
    const port = process.env.PORT || 3000;
    const serverItems = {
        "app": app,
        "http": http,
        "io": io,
        "port": port
    };

    return serverItems;
}

(function main() {
    // Prep server  
    const serverItems = createServer();
    const app   = serverItems.app;
    const http  = serverItems.http;
    const io    = serverItems.io;
    const port  = serverItems.port;
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });

    
    var users = {};
    // New connection
    io.on('connection', (socket) => {
        // Handle new connection
        socket.on('new-connection', data => {
            users[socket.id] = data.username
            // Send all the clients an updated list of the users
            sendClientUsers(socket, io, users);
        });

        
        // Manage messages
        manageMessage(socket, io);

        // Handle diconnection
        socket.on('disconnect', () => {
            delete users[socket.id];
            io.emit('user-disconnect', {
                id: socket.id,
                username: users[socket.id]
            });
        });        
    });
    // Prove listening status
    http.listen(port, () => {
        console.log(`Socket.IO server running at http://localhost:${port}/`);
    });

})();

function sendClientUsers(socket, io, users) {
    console.log('Users before sending them: ');
    console.log(users);
    io.emit('users', users);
}

function manageMessage(socket, io) {
    socket.on('chat message', data => {
        io.emit('chat message', data);
    });
}
