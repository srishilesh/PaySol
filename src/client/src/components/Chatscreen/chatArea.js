import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from './axios';
import ConversationManager from './conversationManager';
import ConversationScreen from './conversationScreen';
import TransactionArea from '../TransactionScreen/transactionArea'
import './chatArea.css';

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
        // <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
        //     <Grid item xs={10}>
                <div className="app">
                    <div className="app_body" >
                        <ConversationManager />
                        <ConversationScreen messages={messages}/>
                        {/* <TransactionArea /> */}
                    </div>
                </div>
        //     </Grid>
        //     <Grid item xs={2} style={{backgroundColor: 'white'}}>
        //         <div className="app">
        //             <TransactionArea />
        //         </div>
        //     </Grid>
        // </Grid>
    );
}

export default Chatscreen;