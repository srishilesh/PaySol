import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from './axios';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
    .then(response => {
      console.log(response);
      setMessages(response.data);
    });
  }, [])

  useEffect(() => {
   const pusher = new Pusher('ea11adf214ecc46819d7', {
      cluster: 'mt1',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app_body" >
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
