import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Sidebar.css';
import Pusher from 'pusher-js';
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AddIcon from '@material-ui/icons/Add';
import SidebarChat from './SidebarChat';
import axios from '../axios';
import { useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { SET_CONVERSATIONS } from '../../../constants/actionTypes';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const ConversationManager = (props) => {
    const userReducerData = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [isloading, setLoading] = React.useState(true);
    const [value, setvalue] = React.useState("");

    const handleClose = () => {
        setOpen(false);
    };
    const inputsHandler = (e) => {
        setvalue(e.target.value)
    }

    const handleNewChat = () => {
        //("New chat");

        let body = {
            _id: value
        }

        axios.post('/finduser', body)
            .then(response => {

                if (response.data.username != null && value != "") {
                    let body = {
                        sender: {
                            "id": userReducerData._id,
                            "name": userReducerData.name
                        },
                        receiver: {
                            "id": value,
                            "name": response.data.username
                        }
                    }

                    axios.post('/conversation/new', body)
                        .then(response => {
                            //(response);
                        })
                }
                else
                    alert("User does not exist")
            })
            .catch(error => {
                //(error)
            }
            )

            handleClose();
    }


    const NewChat = () => {
        setOpen(true)
    }


    const [conversation, setConversation] = useState([]);
    const [conversationData, setConversationData] = useState([]);

    useEffect(() => {

        axios.post('/user/conversations', { _id: userReducerData._id })
            .then(response => {
                //("constructor");
                setConversationData(response.data);
                participantsFormatter(response.data);

            });

    }, [])

    useEffect(() => {
        const pusher = new Pusher('ea11adf214ecc46819d7', {
            cluster: 'mt1',
        });

        const channel = pusher.subscribe('conversations');
        channel.bind('inserted', function (newConversation) {
            // alert(JSON.stringify(newConversation));

            for (const i of newConversation.participants) {
                if (i.id == userReducerData._id) {
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

        //(response)

        response.map((participants, index1) => {
            participants.participants.map((participant, index2) => {
                if (participant.id != userReducerData._id)
                    participantsArray.push({ participant, "conversationId": participants["conversationId"] })
            })
        })

        //(participantsArray)

        setConversation(participantsArray.reverse());
        dispatch({type: SET_CONVERSATIONS, payload: participantsArray})
    }

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar>{userReducerData.name[0]}</Avatar>
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
                        <SidebarChat syncFunction={props.syncFunction} key={key} name={participant.participant.name} conversationId={participant.conversationId} userid={participant.participant.id} />
                    ))}
            </div>

            <div className="new_chat">
                <IconButton onClick={NewChat}>
                    <AddIcon />
                </IconButton>
            </div>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <Typography variant="h5" align="center" color="textSecondary" style={{ marginTop: 20 }} noWrap>
                                Chat with a new user
                            </Typography>
                            <br />
                            <TextField
                                id="outlined-number"
                                label="User Address"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                onChange={inputsHandler}
                            />
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: 20 }}
                                onClick={() => {
                                    handleNewChat()
                                }}
                            >
                                Start chat
                            </Button>

                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
}

export default ConversationManager;