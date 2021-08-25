import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import Pusher from 'pusher-js';
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import CreateIcon from '@material-ui/icons/Create';
import SidebarChat from './SidebarChat';
import axios from './axios';
import { useSelector } from 'react-redux';

const ConversationManager = (props) => {

    const handleNewChat = () => {
        console.log("New chat");

        let body = {
            sender: {
                "id": "123",
                "name": "harshak"
            },
            receiver: {
                "id": "987",
                "name": "aadhi"
            }
        }

        axios.post('/conversation/new', body)
            .then(response => {
                console.log(response);
            })

    }

    const userReducerData = useSelector(state => state.userReducer);
    
    const [conversation, setConversation] = useState([]);
    const [conversationData, setConversationData] = useState([]);

    useEffect(() => {

        axios.get('/user/conversations', {_id: userReducerData._id})
        .then(response => {
            console.log("constructor");
            setConversationData(response.data);
            participantsFormatter(response.data);

        });

    }, [])

    useEffect(() => {
        const pusher = new Pusher('ea11adf214ecc46819d7', {
            cluster: 'mt1',
            });
    
            const channel = pusher.subscribe('conversations');
            channel.bind('inserted', function(newConversation) {
            alert(JSON.stringify(newConversation));
            
            for(const i of newConversation.participants) {
                if(i.id == userReducerData._id) {
                    participantsFormatter([...conversationData, newConversation]);
                    break;
                }
            }

            // setConversation([...conversation, newConversation]);
            });
    
            return () => {
            channel.unbind_all();
            channel.unsubscribe();
            }
    
        }, [conversation]);

    function participantsFormatter(response) {
        let participantsArray = [];

            console.log(response)
            
            response.map((participants, index1) => {
                participants.participants.map((participant, index2) => {
                    if(participant.id != userReducerData._id)
                        participantsArray.push({participant, "conversationId": participants["conversationId"]})
                })
            })

            console.log(participantsArray)

            setConversation(participantsArray.reverse());
    }

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
                    conversation.map((participant, key) => (
                        <SidebarChat syncFunction={props.syncFunction} key={key} name={participant.participant.name} conversationId={participant.conversationId} />
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