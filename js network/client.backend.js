(function main() {
    const nickname = getNickname();
    
    if (nickname != '') {
        const socket = getSocket();
        // Set the nickname to socket's username
        const currentUN = socket.handshake.auth.username;
        console.log("Current UN: " + currentUN.toString());
        socket.handshake.auth.username = nickname;
        const afterUN = socket.handshake.auth.username;
        console.log("After UN: " + afterUN.toString());

        
        // Send and receive nicknames
        // sendNickname(socket, nickname);
        // let users = getUsers(socket);
        // recvNickname(socket);
        // updateNickname(socket);     // TODO: Check if someone has left the chat
        // Check if user is typing
        // if (userIsTyping()) {
        //     sendIsTyping(socket);
        // }
        // // Send and receive messages
        // sendMessage(socket);
        // recvMessage(socket);
    }
})();

function getNickname() {
    // Wait until they give a nickname to connect to the server
    const input = document.getElementById('nick-input');
    const btn = document.getElementById('nick-btn');
    btn.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value) {
            const nickname = input.value
            input.value = '';
            return nickname;
        }
        else {
            alert("Enter a nickname to start chatting.");
            return '';
        }
    });
}

function getUsers(socket) {
    socket.on("users", (users) => {
        users.forEach((user) => {
            user.self = user.userID === socket.id;
            initReactiveProperties(user);
        });
        // put the current user first, and then sort by username
        this.users = users.sort((a, b) => {
            if (a.self) return -1;
            if (b.self) return 1;
            if (a.username < b.username) return -1;
            return a.username > b.username ? 1 : 0;
        });
    });
}

function recvNickname(socket) {
    const nicknames = document.getElementById('nicknames');
    socket.on('nickname', function(nickname) {
        const item = document.createElement('li');
        item.textContent = nickname;
        nicknames.appendChild(item);
    });
}

function updateNickname(socket) {
    // Check if someone has left the chat
    socket.on('')
}

function getSocket() {
    return io();
}

function sendNickname(socket, nickname) {
    socket.emit('nickname', nickname);
}

function sendMessage(socket) {
    // For sending messages
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value) {
            socket.emit('chat message', input.value);
            input.value = '';
        }
    });
    
}

function recvMessage(socket) {
    // Create new HTML for new messages
    const messages = document.getElementById('messages');
    socket.on('chat message', function(msg) {
        const item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });
}