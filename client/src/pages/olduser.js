import React, { Component } from "react";
import {
  generateMnemonicAndSeed,
  getAddressFromSeed,
  mnemonicToSeed,
  getAccountInfo,
} from "../utils/wallet";
import * as solanaWeb3 from "@solana/web3.js";
import * as bip32 from "bip32";
import * as bs from "bs58";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


import axios from '../components/Chatscreen/axios';

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    justifyContent: "center",
    alignItems: "center",
  },
});

class olduser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: "",
      publicaddress: "",
      privateaddress: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({ seed: event.target.value });
  };
  handleChange1 = (event) => {
    this.setState({ password: event.target.value });
  };
  getpublicaddress = async () => {
    const seed = await mnemonicToSeed(this.state.seed);
    //(seed);
    const address = await getAddressFromSeed(seed);
    //(address.secretKey);
    this.setState({ publicaddress: address.publicKey.toString() });
    this.setState({ privateaddress: address.secretKey });
    //(this.state.publicaddress);
    const info = await getAccountInfo(address.publicKey);
    localStorage.setItem("secretkey", bs.encode(this.state.privateaddress));

    let body = {
      _id: this.state.publicaddress
    }
    axios.post('/finduser', body)
      .then(response => {
        if (response.data.password == this.state.password) {
          localStorage.setItem("secretkey", bs.encode(this.state.privateaddress));
          localStorage.setItem("name", response.data.username);
          localStorage.setItem("password", response.data.password);
          this.props.history.push("/chat");
        }
        else
          alert("Incorrect password")
      });


  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <div style={{ textAlign: "center" }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Login into PaySol
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Enter your mnemoic"
                    multiline
                    rows={4}
                    defaultValue={this.state.seed}
                    variant="outlined"
                    onChange={this.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="outlined-required"
                    type="password"
                    label="Password"
                    defaultValue={this.state.password}
                    variant="outlined"
                    onChange={this.handleChange1}
                  />
                </Grid>
              </Grid>

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 20 }}
                  onClick={() => {
                    this.getpublicaddress();
                  }}
                >
                  continue
                </Button>
              </div>
            </div>
          </Paper>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(olduser);
