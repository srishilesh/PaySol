import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axios';
import { Avatar, Button } from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';

import './conversationScreen.css';
import Send from '../../TransactionScreen/sendtransaction'

const ConversationScreen = ({ messages }) => {

    const [input, setInput] = useState("");
    const selectedConversationIdData = useSelector(state => state.selectedConversationReducer)
    const userReducerData = useSelector(state => state.userReducer);

    const sendMessage = (e) => {
        e.preventDefault();

        axios.post('/messages/new', {
            "message": input,
            "sender_id": "123",
            "timestamp": new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            "conversationId": selectedConversationIdData.conversation_id
        });

        setInput("");
    };

    return (
        <div className="chat">

            {(selectedConversationIdData.conversation_id !== -1) ? (<div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>{selectedConversationIdData.name}</h3>
                </div>
            </div>) : (<div />)}

            <div className="chat_body">
                {messages.map((message, key) => (
                    <p key={key} className={`chat_message ${(message.sender_id == "123") && "chat_reciever"}`}>
                        <span className="chat_name">{message.sender_id}</span>
                        {message.message}
                        <span className="chat_timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))}

            </div>

            <div className="chat_footer">
                {/* <InsertEmoticonIcon /> */}
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
                <Button variant="contained" color="primary" onClick={sendMessage}>
                    <TelegramIcon />
                </Button>
                <Send />
            </div>
        </div>
    );
}

export default ConversationScreen;