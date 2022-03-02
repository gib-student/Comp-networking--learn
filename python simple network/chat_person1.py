from client import Client

class chat_person1:
    def __init__(self):
        self._client = Client()
        self.__my_name = "Stephen"
        
    def chat(self):
        
        finished = False
        while not finished:
            print("Entering chat.")
            # Display who is online and ask who they want to talk with
            
    
    def get_name(self):
        return self.__my_name

