import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import * as solanaWeb3 from "@solana/web3.js";
import * as bs from "bs58";
import Home from "./home";
import Intro from "../components/intro";



class landingpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ispublickey: false,
      pk: null,
    };
  }

  
  

 

  componentDidMount() {
    if (localStorage.getItem("secretkey") != null) {
      var pk = new solanaWeb3.Account(
        bs.decode(localStorage.getItem("secretkey"))
      );
      console.log(pk);
      console.log(this.state.ispublickey);
      this.setState({ ispublickey: true, pk: pk.publicKey });
    }
  }

  render() {
    return (
      <div>
       




        {!this.state.ispublickey ? (
          <div
           >
            {/* <button>
              <Link to="/newuser"> Generate New key</Link>
            </button>
            <br />
            <button>
              <Link to="/olduser"> Access Existing Key</Link>
            </button> */}
            <Intro/>
          </div>
        ) : (
          <div>
            <Home title={this.state.pk}></Home>
          </div>
        )}
      </div>
    );
  }
}

export default landingpage;
