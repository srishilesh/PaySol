import React from 'react';
import {Grid} from '@material-ui/core';
import Container from '@material-ui/core/Container';

const TransactionArea = () => {
    return (
        <Grid item xs={3} style={{backgroundColor: 'white'}}>
            <Container>TransactionArea</Container>
        </Grid>
    );
}

export default TransactionArea;