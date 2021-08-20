import React, { Component } from "react";
import * as solanaWeb3 from "@solana/web3.js";
import * as bs from "bs58";
class viewtransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: [],
      publickey: "",
      loading: true,
    };
  }

  async componentDidMount() {
    var con = new solanaWeb3.Connection("https://api.devnet.solana.com/");
    var pk = new solanaWeb3.Account(
      bs.decode(localStorage.getItem("secretkey"))
    );
    console.log(pk);
    this.setState({ publickey: pk.publicKey.toString() });
    var sign = await con.getSignaturesForAddress(pk.publicKey);
    sign.map(async (sign) => {
      var trans = await con.getTransaction(sign.signature);
      console.log(trans);
      this.setState({
        transaction: this.state.transaction.concat(trans),
      });
    });
    //  var trans = await con.getTransaction(sign)
    //  console.log(trans.transaction.message.accountKeys)
    this.setState({ loading: false });
  }

  render() {
   
    if (this.state.loading) return <p>loading</p>;
    else
      return (
        <div>
          {this.state.transaction.map((transaction) =>

{
    if(transaction.transaction.message.accountKeys[0].toString() == this.state.publickey){
        console.log(transaction);
      return  <p>Account:{transaction.transaction.message.accountKeys[1].toString()} Send: {(transaction.meta.preBalances[0]-transaction.meta.postBalances[0])/1000000000} </p>
    } else{
      return  <p>Account:{transaction.transaction.message.accountKeys[0].toString()} Received: {(transaction.meta.postBalances[1]-transaction.meta.preBalances[1])/1000000000}</p>
    }
  }
           
          )}
        </div>
      );
  }
}

export default viewtransaction;
