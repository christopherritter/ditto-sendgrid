import React, { useState, useEffect, forwardRef } from "react";
import { db, functions } from "../firebase";
import { useHistory } from "react-router-dom";

import TemplateDataService from "../services/template.service";

import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#36207f",
    color: "#fff",
  },
  header: {
    color: "#fff",
    marginTop: "0.5em",
    marginBottom: "0.25em",
    textAlign: "center",
  },
  textfield: {
    borderRadius: 4,
    backgroundColor: "#fff",
    marginBottom: "0.5em",
  },
  button: {
    marginBottom: "1.5em",
  },
}));

const initialFormState = { recipient_email: "", reply_to: "", subject: "", body: "" };

const WriteEmail = forwardRef(({ user, selectedTemplate }, ref) => {
  const classes = useStyles();
  const [userProfile, setUserProfile] = React.useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const history = useHistory();

  function onCreateTemplate() {
    // createTemplate(formData);

    TemplateDataService.create(formData)
      .then(() => {
        console.log("Created new template successfully!");
        setFormData(initialFormState);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function sendEmail() {
    const callable = functions.httpsCallable("officialEmail");
    return callable({
      recipient_email: formData.recipient_email,
      reply_to: userProfile.email,
      text: formData.body,
      subject: formData.subject,
    }).then(setFormData(initialFormState));
  }

  function handleRecipientInput(e) {
    const { value } = e.target;
    const recipient_email = value;

    setFormData({ ...formData, recipient_email });
  }

  function handleSubjectInput(e) {
    const { value } = e.target;
    const subject = value;

    setFormData({ ...formData, subject });
  }

  function handleBodyInput(e) {
    const { value } = e.target;
    const body = value;

    setFormData({ ...formData, body });
  }

  useEffect(() => {
    async function fetchUserProfile() {
      var result;
      const snapshot = await db
        .collection("users")
        .where("uid", "==", user.uid)
        .get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach((doc) => {
        result = doc.data();
      });
      setUserProfile(result);
    }
    if (user && !userProfile) {
      fetchUserProfile();
    }
    if (userProfile && !userProfile.email) {
      history.replace("/profile");
    }
  }, [user, userProfile, history]);

  useEffect(() => {
    if (selectedTemplate) {
      setFormData(selectedTemplate);
    }
  }, [selectedTemplate]);

  return (
    <div ref={ref} className={classes.root}>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3" className={classes.header}>
              Write an Email
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textfield}
                    label="Recipient"
                    variant="outlined"
                    fullWidth
                    onChange={handleRecipientInput}
                    placeholder="Recipient"
                    value={formData.recipient_email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textfield}
                    label="Subject"
                    variant="outlined"
                    fullWidth
                    onChange={handleSubjectInput}
                    placeholder="Subject"
                    value={formData.subject}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textfield}
                    label="Body"
                    variant="outlined"
                    fullWidth
                    multiline
                    onChange={handleBodyInput}
                    placeholder="Body of the email."
                    value={formData.body}
                    rows={12}
                  />
                </Grid>
                {user ? (
                  <>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={onCreateTemplate}
                        className={classes.button}
                      >
                        Save Template
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => sendEmail()}
                        className={classes.button}
                      >
                        Send Email
                      </Button>
                    </Grid>
                  </>
                ) : null}
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
});

export default WriteEmail;
