import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axios';
import { Avatar, Button } from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';

import './conversationScreen.css';
import Send from '../../TransactionScreen/sendtransaction'

const ConversationScreen = ({ messages,  scrollBar,changeFunction}) => {


    const [input, setInput] = useState("");
    const selectedConversationIdData = useSelector(state => state.selectedConversationReducer)
    const userReducerData = useSelector(state => state.userReducer);
    const disabled = (selectedConversationIdData.toaddress === "");
    const conversationsData = useSelector(state => state.conversationsReducer);
    //(conversationsData);

    
    useEffect(() => {        
        document.querySelector(".chat_body").scrollTo(0, document.querySelector(".chat_body").scrollHeight);
      }, [scrollBar]);

    const scrollToEnd = () => {
        var chatHistory = document.getElementsByClassName("chat_body");
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }


    const sendMessage = (e) => {
        e.preventDefault();
        
        axios.post('/messages/new', {
            "message": input,
            "sender_id": userReducerData._id,
            "timestamp": new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            "conversationId": selectedConversationIdData.conversation_id
        });

        setInput("");
    };

    return (
        <div className="chat">

            {(selectedConversationIdData.conversation_id !== -1) ? (
                <div className="chat_header">
                    <Avatar>{selectedConversationIdData.name[0]}</Avatar>
                    <div className="chat_headerInfo">
                        <h3>{selectedConversationIdData.name}</h3>
                    </div>
                </div>) : (<div />)}

            <div className="chat_body">
                {messages.map((message, key) => (
                    <p key={key} className={`chat_message ${(message.sender_id == userReducerData._id) && "chat_reciever"}`}>
                        <span className="chat_name">{(message.sender_id == userReducerData._id) && userReducerData.name}</span>
                        <span className="chat_name">{(message.sender_id != userReducerData._id) && selectedConversationIdData.name}</span>
                        {(message.amount) && <h2>{message.amount}</h2>}
                        {message.message}
                        <span className="chat_timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))}

            </div>

            <div className="chat_footer">
                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                        disabled={disabled}
                    />
                    <button onClick={sendMessage} type="submit">
                        Send a message
                    </button>
                </form>
                <Button variant="contained" color="primary" onClick={sendMessage} disabled={disabled}>
                    <TelegramIcon />
                </Button>
                {disabled ? null : <Send changeFunction={changeFunction} />}
            </div>
        </div>
    );
}

export default ConversationScreen;