import React, { Component } from "react";
import * as bs from "bs58";
import * as solanaWeb3 from '@solana/web3.js'; 
import { generateMnemonicAndSeed, getAddressFromSeed, mnemonicToSeed ,Transaction,getAccountInfo } from "../utils/wallet";
class transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
 
      send: false,
      amount: 0
    };
  }
  handleChange = (event) => {
    this.setState({ amount: event.target.value });
  };

  sendtransaction=async()=>
  { 
      
      const from="C7bb1q388SbYqB6EYDMLCo2jXeCbWxDU8jf7rLy6wshM"
      const to="9ovWyEHUDhZSxYphWMj5ftTpBnBJCMwF7msWKSpG1tkb"
      const amount=this.state.amount
      var pk = new solanaWeb3.Account(bs.decode(localStorage.getItem('secretkey')))
      console.log(pk)
     const address=pk
     var info = await getAccountInfo(pk.publicKey)
     var info =info/solanaWeb3.LAMPORTS_PER_SOL
     const totalsol = Number(amount) + Number(0.000005) 
     console.log(totalsol)
     console.log(info)
     if(info>=totalsol)
     {
     var status = await Transaction(from,to,amount,bs.decode(localStorage.getItem('secretkey')))
     console.log(status)
     }
     else
     alert("insufficient balance")


  };
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ send: true });
          }}
        >
          Send
        </button>
        {this.state.send ? <div>
            <input type="number"  value={this.state.amount}
                onChange={this.handleChange}></input>
            <br/>
            <button onClick={()=>
            {
                this.sendtransaction()
            }}>pay</button>
        </div> : <div></div>}
      </div>
    );
  }
}

export default transaction;
