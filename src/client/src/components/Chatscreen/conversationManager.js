import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import CreateIcon from '@material-ui/icons/Create';
import SidebarChat from './SidebarChat';
import axios from './axios';
import { useSelector } from 'react-redux';

const ConversationManager = () => {

    const handleNewChat = () => {
        
    }

    const userReducerData = useSelector(state => state.userReducer);
    
    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        axios.get('/user/conversations', {_id: userReducerData._id})
        .then(response => {
            
            let participantsArray = [];

            for(const participants of response.data) {
                for(const participant of participants) {
                    if(participant.id != userReducerData._id) {
                        participantsArray.push(participant);
                    }
                }
            }

            console.log(participantsArray);

            setConversation(participantsArray);
        });
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src="https://avatars3.githubusercontent.com/u/33751325?s=460&u=80a74dab5069f1b66f51e300fe314ba058d96b92&v=4" />
                <p>{userReducerData.name}</p>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start a new chat" type="text" />
                </div>
            </div>

            <div className="sidebar_chats">
                {
                    conversation.map((participant) => (
                        <SidebarChat name={participant.name} />
                    ))}
            </div>

            <div className="new_chat">
                <IconButton onClick={handleNewChat}>
                    <CreateIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default ConversationManager;