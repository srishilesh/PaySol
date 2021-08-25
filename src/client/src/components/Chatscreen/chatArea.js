import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from './axios';
import ConversationManager from './conversationManager';
import ConversationScreen from './conversationScreen';
import TransactionArea from '../TransactionScreen/transactionArea'
import { useSelector } from 'react-redux';
import './chatArea.css';

const Chatscreen = () => {

    const userReducerData = useSelector(state => state.userReducer);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log(userReducerData)
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
        alert(JSON.stringify(newMessage));
        setMessages([...messages, newMessage]);
        });

        return () => {
        channel.unbind_all();
        channel.unsubscribe();
        }

    }, [messages]);

    return (
        <div className="app">
            <div className="app_body" >
                <ConversationManager />
                <ConversationScreen messages={messages}/>
                {/* <TransactionArea /> */}
            </div>
        </div>
    );
}

export default Chatscreen;