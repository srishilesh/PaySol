import React from 'react';
import {Grid} from '@material-ui/core';
import Container from '@material-ui/core/Container';

const ConversationManager = () => {
    return (
        <Grid item xs={3} style={{backgroundColor: 'white'}}>
            <Container>ConversationManager</Container>
        </Grid>
    );
}

export default ConversationManager;