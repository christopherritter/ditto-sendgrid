import React, { useState, useEffect, forwardRef } from "react";

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
  },
  textfield: {
    borderRadius: 4,
    backgroundColor: "#fff",
    marginBottom: "0.5em",
  },
  button: {
    marginBottom: "1.5em",
  }
}));

const initialFormState = { recipient: "", subject: "", body: "" };

const WriteEmail = forwardRef(({ user, createTemplate, selectedTemplate }, ref) => {
  const classes = useStyles();

  const [formData, setFormData] = useState(initialFormState);

  function onCreateTemplate() {
    createTemplate(formData);
    setFormData(initialFormState);
  }

  async function sendEmail() {
    window.location.href = `mailto:${formData.recipient}?subject=${formData.subject}&body=${formData.body}`;
  }

  function handleRecipientInput (e) {
    const { value } = e.target;
    const recipient =  value.slice(0, 50);

    setFormData({ ...formData, recipient })
  }

  function handleSubjectInput (e) {
    const { value } = e.target;
    const subject =  value.slice(0, 50);

    setFormData({ ...formData, subject })
  }

  function handleBodyInput (e) {
    const { value } = e.target;
    const body =  value.slice(0, 1400);

    setFormData({ ...formData, body })
  }

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
                    value={formData.recipient}
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
                    helperText="Maximum of 1400 characters allowed"
                    rows={12}
                  />
                </Grid>
                {user ? (
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
                ) : null}
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={sendEmail}
                    className={classes.button}
                  >
                    Send Email
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
});

export default WriteEmail;
