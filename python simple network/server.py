import socket
import threading
debug = True

class Server:
    def __init__(self):
        self._HEADER = 64
        self._PORT = 5050
        self._SERVER = socket.gethostbyname(socket.gethostname())
        self._ADDR = (self._SERVER, self._PORT)
        self._FORMAT = 'utf-8'
        self._DISCONNECT_MESSAGE = '!DISCONNECT'
        self._REQUEST_USERS_MSG = '!GET_LIST_USERS'

        self._server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self._server.bind(self._ADDR)

    def handle_client(self, conn, addr):
        print(f"[NEW CONNECTION] {addr} connected.")
        
        connected = True
        while connected:
            msg_length = conn.recv(self._HEADER).decode(self._FORMAT)
            if debug:
                print(f"msg_length: {msg_length}")
            # Ensure message has content
            if msg_length:    
                msg_length = int(msg_length)
                msg = conn.recv(msg_length).decode(self._FORMAT)
                if msg == self._DISCONNECT_MESSAGE:
                    connected = False
                elif msg == self._REQUEST_USERS_MSG:
                    users_online = str(self.get_users_online())
                    conn.send(users_online.encode(self._FORMAT))    
                    
                # Print the message received
                print(f"{addr} {msg}")
                conn.send("Msg received".encode(self._FORMAT))
            
        conn.close()

    def get_users_online(self):
        users_online = threading.enumerate()
        if debug:
            print("\tget_users_online server function called")
            for user in users_online:
                print(user)
        return users_online

    def start(self):
        self._server.listen()
        print(f"[LISTENING] Server is listening on {self._SERVER}")
        while True:
            conn, addr = self._server.accept()
            thread = threading.Thread(target=self.handle_client, args=(conn, addr))
            thread.start()
            print(f"[ACTIVE CONNECTIONS] {threading.active_count() - 1}")
    
if debug:
    server = Server()
    server.start()
    # input = ("Press 'e' when you want a list of the current users ")
    # if input == 'e':
    #     server.get_users_online()