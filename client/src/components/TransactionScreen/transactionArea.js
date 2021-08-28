import React from 'react';
import Accountinfo from './accountinfo';
import { useSelector } from 'react-redux';
import Viewtransaction from './viewtransaction';

const TransactionArea = () => {
    const userReducerData = useSelector(state => state.userReducer);
    return (
        <div>
            <Accountinfo title={userReducerData.pk} name={userReducerData.name} />
            <Viewtransaction />
        </div>
    );
}

export default TransactionArea;