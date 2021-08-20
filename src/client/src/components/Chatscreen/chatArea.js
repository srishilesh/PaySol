import React from 'react';
import ConversationManager from './conversationManager';
import ConversationScreen from './conversationScreen';
import TransactionArea from '../TransactionScreen/transactionArea'

import {Grid} from '@material-ui/core';

const Chatscreen = () => {
    return (
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
            <ConversationManager />
            <ConversationScreen />
            <TransactionArea />
        </Grid>
    );
}

export default Chatscreen;