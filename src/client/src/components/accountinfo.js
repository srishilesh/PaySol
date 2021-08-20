import React, { Component } from "react";
import { getAccountInfo } from "../utils/wallet";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import QRCode from "qrcode.react";

const styles = (theme) => ({
  root: {
    textAlign: "center"
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
  },
});

class accountinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pk: props.title,
      info: null,
    };
  }

  async componentDidMount() {
    const info = await getAccountInfo(this.state.pk);
    this.setState({ info: info });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {/* <h4>{this.state.pk.toString()}</h4>
            <h4>{this.state.info/1000000000}</h4> */}

        <main className={classes.layout}>
          <Paper className={classes.paper}>
          <QRCode
        id="qr-gen"
        value={this.state.pk.toString()}
        size={150}
        level={"H"}
        includeMargin={true}
      />
          <Typography component="h1" variant="h4" align="center">
           Kaipulla
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" noWrap>
          {this.state.pk.toString()}
            </Typography>
            <Typography variant="h4" align="center" paragraph>
            {this.state.info/1000000000} SOL
            </Typography>
          </Paper>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(accountinfo);