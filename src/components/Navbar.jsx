import React from "react";
// import { AmplifySignOut } from '@aws-amplify/ui-react'
// import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: "#ffbd27",
    color: "#36207f",
  },
  title: {
    flexGrow: 1,
    color: "#15151d",
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const { loggedIn, signOut } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            Ditto
          </Typography>
          {loggedIn ? (
            <Button color="primary" onClick={signOut}>
              Sign Out
            </Button>
          ) : (
            <Link to="/signin">
              <Button color="primary">
                Sign Up / Sign In
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
