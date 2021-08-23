import { Avatar } from "@material-ui/core"
import React from 'react';
import "./SidebarChat.css";


function SidebarChat(props) {

    console.log(props)

    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat_info">
                <h2>{props.name}</h2>
                {/* <p>This is the last message</p> */}
            </div>
        </div>
    );
}

export default SidebarChat;