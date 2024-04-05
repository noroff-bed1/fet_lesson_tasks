import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('ws://localhost:8080');

function App() {
  const [room, setRoom] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const [roomClients, setRoomClients] = useState([]);
  // Store the selected client ID to send a private message
  const [selectedClient, setSelectedClient] = useState('');

  useEffect(() => {
    // For all of the messing, create an object that contains the message and the timestamp
    // so this information can be used at a later stage.
    socket.on('message', (message) => {
      const timestamp = new Date();
      setMessages((messages) => [...messages, { text: message, timestamp }]);
    });
    socket.on('global message', (message) => {
      const timestamp = new Date();
      setMessages((messages) => [
        ...messages,
        { text: `GLOBAL: ${message}`, timestamp },
      ]);
    });
    socket.on('room clients', (clients) => {
      setRoomClients(clients);
      console.log('Current clients in room:', clients);
    });
    socket.on('private message', (message) => {
      const timestamp = new Date();
      setMessages((messages) => [
        ...messages,
        { text: `PRIVATE: ${message}`, timestamp },
      ]);
    });

    return () => {
      socket.off('message');
      socket.off('global message');
      socket.off('room clients');
      socket.off('private message');
    };
  }, []);

  const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('set username', { username, room });
      setCurrentRoom(room);
    }
  };

  const sendRoomMessage = () => {
    if (inputMessage !== '') {
      socket.emit('message', { room: currentRoom, message: inputMessage });
      setInputMessage('');
    }
  };

  const sendGlobalMessage = () => {
    if (inputMessage !== '') {
      socket.emit('global message', inputMessage);
      setInputMessage('');
    }
  };

  const sendPrivateMessage = () => {
    // Check that a message and a client are selected
    if (inputMessage !== '' && selectedClient !== '') {
      // Send a private message to the selected client
      socket.emit('private message', {
        to: selectedClient,
        message: inputMessage,
        from: username,
      });
      // Get the current timestamp
      const timestamp = new Date();
      // Update the messages state with the new private message
      setMessages((messages) => [
        ...messages,
        { text: `To ${selectedClient}: ${inputMessage}`, timestamp },
      ]);
      setInputMessage('');
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      {currentRoom && <h3>Current Room: {currentRoom}</h3>}
      <div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Enter your username..."
        />
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          type="text"
          placeholder="Enter room name..."
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <input
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        type="text"
        placeholder="Type a message..."
      />
      <button onClick={sendRoomMessage}>Send room message</button>
      <button onClick={sendGlobalMessage}>Send Global Message</button>
      <div>
        <h4>Clients in Room:</h4>
        <ul>
          {roomClients.map((client) => (
            <li key={client.id}>{client.username}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Send Private Message:</h4>
        <select
          onChange={(e) => setSelectedClient(e.target.value)}
          value={selectedClient}
        >
          <option value="">Select a user</option>
          {roomClients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.username}
            </option>
          ))}
        </select>
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          type="text"
          placeholder="Type a private message..."
        />
        <button onClick={sendPrivateMessage}>Send Private Message</button>
      </div>
      <h3>Messages</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.timestamp.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}{' '}
            - {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
