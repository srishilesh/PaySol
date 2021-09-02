import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import * as bs from "bs58";
import * as solanaWeb3 from '@solana/web3.js';
import axios from './axios';
import { Transaction, getAccountInfo } from "../../utils/wallet";
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import "../Chatscreen/ConversationScreen/conversationScreen"
import Snackbars from '../Snackbar';

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

export default function Sendtransaction(props) {
  const userReducerData = useSelector(state => state.userReducer);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isloading, setLoading] = React.useState(true);
  const [notification, setNotification] = React.useState(0);
  const [value, setvalue] = React.useState(0);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputsHandler = (e) => {
    setvalue(e.target.value)
  }

  const selectedConversationIdData = useSelector(state => state.selectedConversationReducer)
  const sendtransaction = async () => {
    if(Number(value)<=0)
    alert("invalid number")
    else{
    const from = userReducerData._id
    const to = selectedConversationIdData.toaddress
    const amount = value
    var pk = new solanaWeb3.Account(bs.decode(localStorage.getItem('secretkey')))
    //(pk)
    const address = pk
    var info = await getAccountInfo(pk.publicKey)
    var info = info / solanaWeb3.LAMPORTS_PER_SOL
    const totalsol = Number(amount) + Number(0.000005)
    // //(totalsol)
    // //(info)
    // //(to)
    if (info >= totalsol) {
      setLoading(false)
      var status = await Transaction(from, to, amount, bs.decode(localStorage.getItem('secretkey')))
      setNotification(1);
      //(status);
      axios.post('/messages/new', {
        "message": "Success",
        "sender_id": userReducerData._id,
        "timestamp": new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        "conversationId": selectedConversationIdData.conversation_id,
        "amount": amount
    });
    props.changeFunction()
    setLoading(true)
      setOpen(false);
     
    } else {
      setNotification(2);
      axios.post('/messages/new', {
        "message": "Failure",
        "sender_id": userReducerData._id,
        "timestamp": new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        "conversationId": selectedConversationIdData.conversation_id,
        "amount": amount

    });
  }
    }
}

  return (
    <div>
      <div class="chat_footer">
        <Button variant="contained" color="primary" onClick={handleOpen}>
          pay
        </Button>
      </div>
      {notification === 1 ? <Snackbars type="success" /> : null}
      {notification === 2 ? <Snackbars type="error" /> : null}
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
            {isloading ?
              (
                <diV>
                  <Typography variant="body2" align="center" color="textSecondary" style={{ marginTop: 20 }} noWrap>
                    To:{selectedConversationIdData.toaddress}
                  </Typography>
                  <br />
                  <TextField
                    id="outlined-number"
                    label="SOL Amount"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    onChange={inputsHandler}
                    required
                   
                  />

                  <br />
                  <br />
                  <TextField
                    id="filled-number"
                    label="Fee"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    disabled
                    value="0.000005"
                  />
                  <br />
                  <br />
                  <Typography variant="body2" align="center" color="textSecondary" noWrap>
                    Total: {Number(value) + Number(0.000005)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20 }}
                    onClick={() => {
                      sendtransaction()
                    }}
                  >
                    Pay
                  </Button>
                </diV>) :
              (<div><CircularProgress /></div>)
            }
          </div>
        </Fade>
      </Modal>
    </div>
  );
}