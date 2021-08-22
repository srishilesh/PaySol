import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from './axios';
import './conversationScreen.css';

const ConversationScreen = ({ messages }) => {

    const [input, setInput] = useState("")

    const sendMessage = (e) => {
        e.preventDefault();

        axios.post('/messages/new', {
            "message": input,
            "name": "qwerty",
            "timestamp": "some time",
            "received": true
        });

        setInput("");
    };

    return (
        <Grid item xs={5} style={{backgroundColor: 'white'}}>
           <Container>
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
           </Container>
        </Grid>
    );
}

export default ConversationScreen;