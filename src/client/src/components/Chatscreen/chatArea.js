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
    const selectedConversationIdData = useSelector(state => state.selectedConversationReducer)

    const [messages, setMessages] = useState([]);

    console.log(userReducerData)

    useEffect(() => {

        let body = {conversationId: selectedConversationIdData.conversation_id};
        console.log("Conversation "+ selectedConversationIdData.conversation_id);

        axios.post('/messages/sync', body)
        .then(response => {
        console.log(response);
        setMessages(response.data);
        });

    }, [])

    function syncFunction() {
        let body = {conversationId: selectedConversationIdData.conversation_id};
        console.log("Conversation "+ selectedConversationIdData.conversation_id);

        axios.post('/messages/sync', body)
        .then(response => {
        setMessages(response.data);
        });
    }

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

    return (
        <div className="app">
            <div className="app_body" >
                <ConversationManager syncFunction={syncFunction} />
                <ConversationScreen messages={messages} />
                {/* <TransactionArea /> */}
            </div>
        </div>
    );
}

export default Chatscreen;