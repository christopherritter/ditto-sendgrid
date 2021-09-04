import React, { forwardRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
    color: "#15151d",
  },
  header: {
    color: "#15151d",
    marginTop: "0.5em",
    marginBottom: "0.25em",
  },
  letter: {
    margin: "1em",
  },
}));

const SelectTemplate = forwardRef(({ templates, selectTemplate, user, deleteTemplate, writeEmail }, ref) => {
  const classes = useStyles();

  function onSelectTemplate(template) {
    selectTemplate(template);
    writeEmail();
  }

  return (
    <div ref={ref} className={classes.root}>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3" className={classes.header}>
              Select a Template
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              {templates.map((template, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card className={classes.letter}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {template.subject}
                      </Typography>
                      <Typography gutterBottom variant="body2" component="p">
                        {template.recipient}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        component="p"
                        display="block"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {template.body}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        color="primary"
                        onClick={() => onSelectTemplate(template)}
                      >
                        Select template
                      </Button>
                      {user &&
                      user.authorID === template.authorID ? (
                        <Button onClick={() => deleteTemplate(template)}>
                          Delete template
                        </Button>
                      ) : null}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* <Grid item xs={12}>
            <Button>View More ▾</Button>
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
});

export default SelectTemplate;
