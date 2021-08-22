import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from './axios';
import ConversationManager from './conversationManager';
import ConversationScreen from './conversationScreen';
import TransactionArea from '../TransactionScreen/transactionArea'

import { Grid } from '@material-ui/core';

const Chatscreen = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('/messages/sync')
        .then(response => {
        console.log(response);
        setMessages(response.data);
        });
    }, [])

    useEffect(() => {
    const pusher = new Pusher('b2975d4dc0077112be09', {
        cluster: 'ap2',
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
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
            <ConversationManager />
            <ConversationScreen messages={messages}/>
            <TransactionArea />
        </Grid>
    );
}

export default Chatscreen;