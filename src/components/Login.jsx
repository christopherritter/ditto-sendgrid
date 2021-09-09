import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithFacebook,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  facebookButton: {
    color: "#fff",
    backgroundColor: "#4267B2",
  },
  theBigOr: {
    fontSize: "0.75 rem",
    textAlign: "center",
    marginTop: "1rem",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  helpText: {
    textAlign: "center",
    marginBottom: "8rem",
  }
}));

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      history.replace("/");
    }
  }, [user, loading, history]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img
              width="100%"
              src={process.env.PUBLIC_URL + "/img/ditto_text-logo.png"}
              alt="Ditto logo"
            />
          </Grid>
        </Grid>
        <form className={classes.form} noValidate>
          <Button
            className={classes.facebookButton}
            startIcon={<FacebookIcon />}
            onClick={signInWithFacebook}
            variant="contained"
            size="large"
            fullWidth
          >
            Login with Facebook
          </Button>
          <Typography variant="h6" className={classes.theBigOr}>or</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="email"
            label="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className={classes.submit}
            disabled={password.length < 5}
            onClick={() => signInWithEmailAndPassword(email, password)}
            fullWidth
            variant="contained"
            size="large"
          >
            Login
          </Button>

          <Grid container className={classes.helpText}>
            <Grid item sm={12}>
              <Link to="/reset">Forgot Password</Link>
            </Grid>
            <Grid item sm={12}>
              Don't have an account? <Link to="/register">Register</Link> now.
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
export default Login;
