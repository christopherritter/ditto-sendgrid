import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Button, Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#36207f",
    color: "#fff",
    textAlign: "center",
    padding: "1rem 0 2rem 0",
  },
  header: {
    color: "#fff",
    marginTop: "0.25em",
  },
  body: {
    marginTop: "1em",
  },
  button: {
    "&:hover": {
      backgroundColor: "#fff",
    },
    backgroundColor: "#ffbd27",
    color: "#15151d",
    marginTop: "2em",
    marginRight: "1em",
    paddingLeft: "2em",
    paddingRight: "2em",
  }
}));

const JumbotronComponent = (props) => {
  const classes = useStyles();
  const { selectTemplate, writeEmail } = props;

  return (
    <div className={classes.root}>
      <Container>
        <Grid container alignItems="center">
          <Grid item sm={12} md={6}>
            <Typography variant="h2" className={classes.header}>
              Amplify your voice
            </Typography>
            <Typography className={classes.body} variant="body1">
              Share your emails to elected officials so that others can use them as a template to write and send their own email messages.
            </Typography>
            <Button className={classes.button} onClick={writeEmail}>Write an Email</Button>
            <Button className={classes.button} onClick={selectTemplate}>Select a Template</Button>
          </Grid>
          <Hidden smDown>
            <Grid item md={6}>
              <img
                className={classes.image}
                src={process.env.PUBLIC_URL + "/img/megaphone.svg"}
                alt="Megaphone"
              />
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </div>
  );
};

export default JumbotronComponent;
