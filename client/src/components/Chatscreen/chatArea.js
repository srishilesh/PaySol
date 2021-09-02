import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from './axios';
import ConversationManager from './ConversationManager/conversationManager';
import ConversationScreen from './ConversationScreen/conversationScreen';
import TransactionArea from '../TransactionScreen/transactionArea'
import { useSelector } from 'react-redux';
import './chatArea.css';

const Chatscreen = () => {

    const userReducerData = useSelector(state => state.userReducer);
    const selectedConversationIdData = useSelector(state => state.selectedConversationReducer)

    const [messages, setMessages] = useState([]);
    const [scrollBar, setScrollBar] = useState(0);
    const [change, setChange] = useState(false);

    //(userReducerData)

    useEffect(() => {

        let body = {conversationId: selectedConversationIdData.conversation_id};
        //("Conversation "+ selectedConversationIdData.conversation_id);

        axios.post('/messages/sync', body)
        .then(response => {
        //(response);
        setMessages(response.data);
        });

    }, [])

    function syncFunction() {
        let body = {conversationId: selectedConversationIdData.conversation_id};
        //("Conversation "+ selectedConversationIdData.conversation_id);

        axios.post('/messages/sync', body)
        .then(response => {
        setMessages(response.data);
        setScrollBar(prev => prev + 1);
        });
    }

    function changeFunction() {
        setChange(!change)
     
    }

    useEffect(() => {
        
    const pusher = new Pusher('ea11adf214ecc46819d7', {
        cluster: 'mt1',
        });
      
        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function(newMessage) {
        // alert(JSON.stringify(newMessage));
        if(selectedConversationIdData.conversation_id == newMessage.conversationId) {
            setMessages([...messages, newMessage]);
            setScrollBar(prev => prev + 1);
        }
        
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
                <ConversationScreen messages={messages} changeFunction={changeFunction} scrollBar={scrollBar} />
                <TransactionArea ischange={change} />
            </div>
        </div>
    );
}

export default Chatscreen;