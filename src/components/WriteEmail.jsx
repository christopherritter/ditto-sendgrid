import React, { useState, useEffect, forwardRef } from "react";
import { db, functions } from "../firebase";
import { useHistory } from "react-router-dom";

import TemplateDataService from "../services/template.service";
import PreviewEmail from "./PreviewEmail.jsx";

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
    paddingBottom: theme.spacing(4),
  },
  header: {
    color: "#fff",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    textAlign: "center",
  },
  textfield: {
    borderRadius: 4,
    backgroundColor: "#fff",
    marginBottom: theme.spacing(1),
  },
  button: {
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
}));

const initialFormState = {
  recipient_email: "",
  reply_to: "",
  subject: "",
  body: "",
};

const WriteEmail = forwardRef(
  ({ user, selectedTemplate, scrollToWriteEmail }, ref) => {
    const classes = useStyles();
    const [userProfile, setUserProfile] = React.useState(null);
    const [formData, setFormData] = useState(initialFormState);
    const [showPreview, setShowPreview] = useState(false);
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

    function previewEmail() {
      setShowPreview(true);
    }

    function hidePreview() {
      setShowPreview(false);
      scrollToWriteEmail();
    }

    async function sendEmail() {
      const callable = functions.httpsCallable("officialEmail");

      setShowPreview(false);

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
        <PreviewEmail
          formData={formData}
          showPreview={showPreview}
          hidePreview={hidePreview}
          selectedTemplate={selectedTemplate}
          sendEmail={() => sendEmail()}
        />
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
                      <Grid item xs={12} style={{ textAlign: "right" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={onCreateTemplate}
                          className={classes.button}
                          disabled={!formData.recipient_email || !formData.subject || !formData.body}
                        >
                          Save Template
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={previewEmail}
                          className={classes.button}
                          disabled={!formData.recipient_email || !formData.subject || !formData.body}
                        >
                          Preview Email
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
  }
);

export default WriteEmail;
