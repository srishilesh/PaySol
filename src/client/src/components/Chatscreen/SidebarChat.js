import { Avatar } from "@material-ui/core"
import React, { useEffect, useState } from 'react';
import axios from './axios';
import "./SidebarChat.css";


function SidebarChat() {

    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        axios.get('/user/conversations', {_id: "123"})
        .then(response => {
        console.log(response);
        setConversation(response.data);
        });
    }, [])

    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat_info">
                <h2>Room name</h2>
                <p>This is the last message</p>
            </div>
        </div>
    );
}

export default SidebarChat;