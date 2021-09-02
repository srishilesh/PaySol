import React, { useState } from 'react';
import Accountinfo from "./accountinfo";
import { useSelector } from "react-redux";
import Viewtransaction from "./viewtransaction";

const TransactionArea = (props) => {
  const userReducerData = useSelector((state) => state.userReducer);
  //(props.ischange)

  return (
    <div>
      <Accountinfo title={userReducerData.pk} name={userReducerData.name} ischange={props.ischange} />
      <Viewtransaction ischange={props.ischange}/>
    </div>
  );
 
};

export default TransactionArea;
