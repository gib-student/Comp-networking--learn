        // Get a username
        const unInput   = document.querySelector('.un-input');
        const unForm     = document.querySelector('.un-form');
        unForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = unInput.value;
            if (username) {
                unInput.value = '';
                alert("You are now chatting");
                main(username);
            }
            else {alert("Enter a username to start chatting.");}
        });

        function main(username) {
            // Make socket
            var socket = io();
            
            // Send username
            sendUsername(socket, username);

            // Get all users and display them
            console.log('we got to here');
            const users = getUsers(socket);
            displayUsers(users);
            
            // Get and send messages
            getMessage(socket);
            sendMessage(socket);

        }
        
        function getUsers(socket) {
            socket.on('users', users => {
                console.log("users upon reception: ");
                console.log(users);
                return users;
            });
        }

        function sendUsername(socket, username) {
            socket.emit('new-connection', { username });
        }
        
        function displayUsers(users) {
            const usersList = document.querySelector('users-list');
            for (let id in users) {
                console.log("id: " + id);
                const li = document.createElement('li');
                const username = users[id];
                li.innerHTML = username;
                usersList.appendChild(li);
            }
        }
        
        function getMessage(socket) {
            var messages = document.getElementById('messages');

            socket.on('chat message', function(msg) {
                var item = document.createElement('li');
                item.textContent = msg;
                messages.appendChild(item);
                window.scrollTo(0, document.body.scrollHeight);
            });
        }

        function sendMessage(socket) {
            var form = document.getElementById('form');
            var input = document.getElementById('input');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                if (input.value) {
                    socket.emit('chat message', input.value);
                    input.value = '';
                }
            });
            
        }
        