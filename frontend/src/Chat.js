import React, { useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from './axios';

function Chat({ messages }) {
    const [input, setInput] = useState("")

    const sendMessage = (e) => {
        e.preventDefault();

        axios.post('/messages/new', {
            "message": input,
            "name": "qwerty",
            "timestamp": "some time",
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
