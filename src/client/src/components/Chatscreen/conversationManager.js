import React from 'react';
import {Grid} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from './SidebarChat';

const ConversationManager = () => {
    return (
        <Grid item xs={4} style={{backgroundColor: 'white'}}>
            <Container>
            <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src="https://avatars3.githubusercontent.com/u/33751325?s=460&u=80a74dab5069f1b66f51e300fe314ba058d96b92&v=4" />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start a new chat" type="text" />
                </div>
            </div>

            <div className="sidebar_chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
            </Container>
        </Grid>
    );
}

export default ConversationManager;