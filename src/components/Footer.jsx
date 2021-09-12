import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#005641",
    color: "#fff"
  },
  footer: {
    "& a": {
      color: "#fff"
    },
    textAlign: "center",
    padding: theme.spacing(4),
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body2" className={classes.footer}>
            Another project created by <a href="http://www.christopherritter.com/" target="_blank" rel="noreferrer">Christopher Ritter</a>. <Link to="/privacy">Privacy Policy</Link> < br />
            Part of the <a href="http://www.openspringboro.com/" target="_blank" rel="noreferrer">Open Springboro</a> project.
            Artwork by <a href="https://www.vecteezy.com/members/imajin-noasking" target="_blank" rel="noreferrer">imajin noasking</a>.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
