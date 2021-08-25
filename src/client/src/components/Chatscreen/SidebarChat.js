import { Avatar } from "@material-ui/core"
import React from 'react';
import { useDispatch } from "react-redux";
import "./SidebarChat.css";
import {SET_CONVERSATION_ID} from '../../constants/actionTypes';


function SidebarChat(props) {
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch({type: SET_CONVERSATION_ID, payload: props.conversationId});
        props.syncFunction()
    }

    return (
        <div className="sidebarChat" onClick={handleOnClick}>
            <Avatar />
            <div className="sidebarChat_info">
                <h2>{props.name}</h2>
                <p>{props.conversationId}</p>
            </div>
        </div>
    );
}

export default SidebarChat;