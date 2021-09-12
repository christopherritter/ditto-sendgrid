import React, { useEffect, forwardRef } from "react";

import TemplateDataService from "../services/template.service";

import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Avatar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
    color: "#15151d",
    marginBottom: "2rem",
  },
  header: {
    color: "#15151d",
    marginTop: "0.5em",
    marginBottom: "0.25em",
    textAlign: "center",
  },
  primaryButton: {
    color: "#005641",
  },
  letter: {
    margin: "1em",
  },
  avatar: {
    backgroundColor:"#005641",
  },
}));

const SelectTemplate = forwardRef(
  ({ selectTemplate, user, deleteTemplate, writeEmail }, ref) => {
    const classes = useStyles();

    const [templates, setTemplates] = React.useState([]);

    useEffect(() => {
      getTemplates();
    }, []);

    async function getTemplates() {
      const snapshot = await TemplateDataService.getAll().get();
      const results = [];
      snapshot.forEach((doc) => {
        let result = doc.data();
        result.id = doc.id;
        results.push(result);
      });
      setTemplates(results);
    }

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
                {templates &&
                  templates.map((template, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <Card className={classes.letter}>
                        <CardHeader
                          avatar={
                            <Avatar
                              aria-label="recipe"
                              className={classes.avatar}
                            >
                              R
                            </Avatar>
                          }
                          title={template.recipient_email}
                          subheader="Recipient"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {template.subject}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            component="p"
                          >
                            {template.recipient}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="textSecondary"
                            component="p"
                            display="block"
                            style={{ whiteSpace: "pre-line" }}
                          >
                            { template.length < 500 ? template.body : template.body.substring(0,500) + "..." }
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            className={classes.primaryButton}
                            onClick={() => onSelectTemplate(template)}
                          >
                            View template
                          </Button>
                          {user && user.authorID === template.authorID ? (
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
  }
);

export default SelectTemplate;
