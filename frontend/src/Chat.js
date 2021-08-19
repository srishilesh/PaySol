import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from './axios';

import io from 'socket.io-client';

const socket = io('localhost:3001');

function Chat({ messages }) {
    const [input, setInput] = useState("")
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
        setIsConnected(true);
        });
        socket.on('disconnect', () => {
        setIsConnected(false);
        });
        socket.on('message', data => {
        setLastMessage(data);
        });
        return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('message');
        };
    });

    const sendMessage = (e) => {
        e.preventDefault();

        socket.emit('newMessage', {message: input, name: "qwerty"});
        axios.post('/messages/new', {
            "message": input,
            "name": "qwerty",
            "timestamp": new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            "received": false
        });

        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />

                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen ...</p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map((message) => (
                    <p className={`chat_message ${message.received && "chat_reciever"}`}>
                         <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))}
                
            </div>

            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button onClick={sendMessage} type="submit">
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}

export default Chat;
