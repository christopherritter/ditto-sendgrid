import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#36207f",
    color: "#fff"
  },
  header: {
    color: "#fff",
    marginTop: "0.25em",
  },
  body: {
    marginTop: "1em",
  },
  button: {
    backgroundColor: "#ffbd27",
    color: "#15151d",
    marginTop: "2em",
    marginRight: "1em"
  }
}));

const JumbotronComponent = (props) => {
  const classes = useStyles();
  const { selectTemplate, writeEmail } = props;

  return (
    <div className={classes.root}>
      <Container>
        <Grid container alignItems="center">
          <Grid item sm={6} md={5}>
            <Typography variant="h2" className={classes.header}>
              Amplify your voice
            </Typography>
            <Typography className={classes.body} variant="body1">
              Share your emails to elected officials so that others can use them as a template to write and send their own email messages.
            </Typography>
            <Button className={classes.button} onClick={writeEmail}>Write an Email</Button>
            <Button className={classes.button} onClick={selectTemplate}>Select a Template</Button>
          </Grid>
          <Grid item sm={6} md={7}>
            <img
              src={process.env.PUBLIC_URL + "/img/megaphone.svg"}
              alt="Megaphone"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default JumbotronComponent;
