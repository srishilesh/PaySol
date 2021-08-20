import React, { Component } from 'react';
import { getAccountInfo } from "../utils/wallet";
import Transaction from '../components/transaction';
import Viewtransaction from '../components/viewtransaction';
import Accountinfo from '../components/accountinfo';
class home extends Component {
    constructor(props) {
        super(props);
        this.state={
            pk:props.title
        }
    }



 

    render() {
        return (
            <div>
            <Accountinfo title={this.state.pk}/>
            <Transaction/>
            <Viewtransaction/>
            </div>
        );
    }
}

home.propTypes = {

};

export default home;