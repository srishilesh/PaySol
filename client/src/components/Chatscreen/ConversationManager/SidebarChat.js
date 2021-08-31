import { Avatar } from "@material-ui/core"
import React from 'react';
import { useDispatch } from "react-redux";
import "./SidebarChat.css";
import {SET_CONVERSATION_ID} from '../../../constants/actionTypes';


function SidebarChat(props) {
    const dispatch = useDispatch();
    let detail={
        conversationId:props.conversationId,
        toaddress:props.userid,
        name:props.name
    }
    const handleOnClick = () => {
        dispatch({type: SET_CONVERSATION_ID, payload:detail});
        props.syncFunction()
    }

    return (
        <div className="sidebarChat" onClick={handleOnClick}>
            <Avatar>{props.name[0]}</Avatar>
            <div className="sidebarChat_info">
                <h2>{props.name}</h2>
            </div>
        </div>
    );
}

export default SidebarChat;