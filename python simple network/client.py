import socket
debug = True

class Client:
    
    def __init__(self):
        
        self._HEADER = 64
        self._PORT = 5050
        self._FORMAT = 'utf-8'
        self._SERVER = socket.gethostbyname(socket.gethostname())
        self._ADDR = (self._SERVER, self._PORT)
        self._client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self._client.connect(self._ADDR)
        self._DISCONNECT_MESSAGE = '!DISCONNECT'
        self._REQUEST_USERS_MSG = '!GET_LIST_USERS'

    def send(self, msg):
        message = msg.encode(self._FORMAT)
        msg_length = len(message)
        send_length = str(msg_length).encode(self._FORMAT)
        send_length += b' ' * (self._HEADER - len(send_length))
        self._client.send(send_length)
        self._client.send(message)
        print(self._client.recv(8192).decode(self._FORMAT))
        
    def get_users_online(self):
        users_online = []
        message = self._REQUEST_USERS_MSG.encode(self._FORMAT)
        msg_length = len(message)
        send_length = str(msg_length).encode(self._FORMAT)
        send_length += b' ' * (self._HEADER - len(send_length))
        self._client.send(send_length)
        self._client.send(message)
        users_online = self._client.recv(5000).decode(self._FORMAT).split()
        
        return users_online

    def example_send(self):    
        self.send("Hello World!")
        input()
        self.send("Hello Everyone!")
        input()
        self.send("Hello Tim!")
        self.send(self._DISCONNECT_MESSAGE)

if debug:
    client = Client()
    client.send("!GET_LIST_USERS")
    # client.example_send()
    # users_online = client.get_users_online()
    # print(users_online)
    # print(f"variable type: {type(users_online)}")
    
    # client.example_send()