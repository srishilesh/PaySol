import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import * as solanaWeb3 from "@solana/web3.js";
import * as bs from "bs58";
import '../../components/Chatscreen/ConversationScreen/conversationScreen.css'

function getAccountDetails(transaction, publickey) {
  if (transaction.transaction.message.accountKeys[0].toString() == publickey) {
    return [transaction.transaction.message.accountKeys[1].toString(), 0, (transaction.meta.preBalances[0] - transaction.meta.postBalances[0]) / 1000000000]
  } else {
    return [transaction.transaction.message.accountKeys[0].toString(), 1, (transaction.meta.postBalances[1] - transaction.meta.preBalances[1]) / 1000000000]
  }
}

class viewtransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: [],
      publickey: "",
      loading: true,
    };
  }


 async allTransaction()
 {
   var empty=[]
   this.setState({transaction:empty})
  var con = new solanaWeb3.Connection("https://api.devnet.solana.com/");
  var pk = new solanaWeb3.Account(
    bs.decode(localStorage.getItem("secretkey"))
  );
  //(pk);
  this.setState({ publickey: pk.publicKey.toString() });
  var sign = await con.getSignaturesForAddress(pk.publicKey);
  //(sign[0])
  sign.map(async (sign) => {
    var trans = await con.getTransaction(sign.signature);
   
   
    this.setState({
      transaction: [...this.state.transaction, trans]
    })
   
  });
  // var trans = await con.getTransaction(sign[0].signature);
  // //(trans.blockTime);
  // this.setState({
  //   transaction: this.state.transaction.concat(trans),
  // });

  //  var trans = await con.getTransaction(sign)
  //  //(trans.transaction.message.accountKeys)
 this.state.transaction.sort((a, b) => b.blockTime - a.blockTime);
 //(this.state.transaction)
  this.setState({ loading: false });
}

  async componentDidMount() {
    this.allTransaction()
   
  }

  componentDidUpdate(prevProps) {
    if(this.props.ischange!=prevProps.ischange) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      //("hello")
      this.allTransaction()
    }
  } 
  

  render() {

    if (this.state.loading) return <p>Loading...</p>;
    else
      return (
        <div>
          <TableContainer style={{maxHeight: 225}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Public Key</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.transaction.map((transaction) => {
                  var transactionDetails = getAccountDetails(transaction, this.state.publickey)
                  return (
                    <TableRow hover>
                      <TableCell style={{wordWrap: 'break-word'}}>{transactionDetails[0]}</TableCell>
                      <TableCell style={(transactionDetails[1] == 0) ? {backgroundColor:'red'} : {backgroundColor: 'green'}}>{transactionDetails[2]}</TableCell>
                    </TableRow>
                  )
                }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
  }
}

export default viewtransaction;
