import React from "react";
import { logout } from "../firebase";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Forum";
import BackIcon from "@material-ui/icons/ChevronLeft";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: "#ffbd27",
    color: "#36207f",
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const { loggedIn } = props;
  const classes = useStyles();
  const location = useLocation();

  console.log("location", location);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          {location.pathname === "/" ? (
            <>
              <IconButton aria-label="Ditto" color="inherit">
                <HomeIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Ditto
              </Typography>
            </>
          ) : (
            <>
              <IconButton
                component={Link}
                to="/"
                aria-label="Back to Ditto"
                color="inherit"
              >
                <BackIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Back
              </Typography>
            </>
          )}
          {loggedIn ? (
            <Button color="primary" onClick={logout}>
              Sign Out
            </Button>
          ) : (
            <Link to="/login">
              <Button color="primary">Login / Register</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
