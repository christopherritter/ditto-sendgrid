import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#ffbd27",
    color: "#36207f",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const { showPreview, hidePreview, sendEmail, formData, userProfile } = props;
  const classes = useStyles();

  const dialogRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Dialog
      fullScreen
      open={showPreview}
      onClose={hidePreview}
      TransitionComponent={Transition}
      ref={dialogRef}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={hidePreview}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Preview Email
          </Typography>
          <Button autoFocus color="inherit" onClick={sendEmail}>
            Send Email
          </Button>
        </Toolbar>
      </AppBar>
      {formData && (
        <List>
          <ListItem button>
            <ListItemText
              primary="Recipient"
              secondary={formData.recipient_email}
            />
          </ListItem>
          {userProfile && userProfile.email && (
            <>
              <Divider />
              <ListItem button>
                <ListItemText
                  primary="Reply To"
                  secondary={userProfile.email}
                />
              </ListItem>
            </>
          )}
          <Divider />
          <ListItem button>
            <ListItemText primary="Subject" secondary={formData.subject} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Message"
              style={{ whiteSpace: "pre-line" }}
              secondary={formData.body}
            />
          </ListItem>
        </List>
      )}
    </Dialog>
  );
}
