import React, { useEffect } from "react";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField, Button } from "@material-ui/core";

const usersCollection = db.collection("/users");

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Profile() {
  const [user] = useAuthState(auth);
  const [userProfile, setUserProfile] = React.useState(null);
  const history = useHistory();
  const classes = useStyles();

  async function updateUserProfile() {
    var docId;
    const snapshot = await usersCollection.where("uid", "==", user.uid).get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    snapshot.forEach((doc) => {
      docId = doc.id;
    });
    usersCollection.doc(docId).update({ email: userProfile.email });
    history.replace("/");
  }

  useEffect(() => {
    async function fetchUserProfile() {
      var result;
      const snapshot = await usersCollection.where("uid", "==", user.uid).get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach((doc) => {
        result = doc.data();
      });
      setUserProfile(result);
    }
    if (!user) {
      history.replace("/login");
    }
    if (user && !userProfile) {
      fetchUserProfile();
    }
  }, [user, userProfile, history]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <h2>Enter email address</h2>
        <p>A valid email address is required in order to use Ditto.</p>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            onChange={(e) =>
              setUserProfile({ ...userProfile, email: e.target.value })
            }
          />
          <Button className="login__btn" onClick={updateUserProfile}>
            Update Email
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Profile;
