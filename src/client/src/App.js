import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Landingpage from "./pages/landingpage";
import Newuser from "./pages/newuser";
import Olduser from "./pages/olduser";
import './App.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: 'none'
  },
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${ 'https://media.istockphoto.com/photos/dynamic-retro-background-picture-id1200128505?k=6&m=1200128505&s=170667a&w=0&h=9ptkATxQZ7LsqQgCeGKssMAzfCQb9zsyW5-NGjKa6I8='})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  color:{
    color: '#fff',
  }
}))


function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <div>
          <CssBaseline/>
          <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" color="inherit" noWrap className={classes.color}>
            PAYSOL
          </Typography>
        </Toolbar>
      </AppBar>
          <Route exact path="/" component={Landingpage} />
          <Route path="/newuser" component={Newuser} />
          <Route path="/olduser" component={Olduser} />
         
        </div>
      </Router>
    </div>
  );
}

export default App;
