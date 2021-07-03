import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    height: "53px",
    margin: 0,
    padding: theme.spacing(2),
    background: "#e0e0e0"
  },
  title: {
    font: "400 18px Helvetica"
  },
  closeButton: {
    position: "absolute",
    right: "8px",
    top: "2px",
    color: theme.palette.grey[500]
  }
});
const CustomDialog = withStyles((theme) => ({
  paper: {
    width: "550px",
    borderRadius: "8px",
    background: "#fff"
  }
}))(Dialog);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {children}
      </Typography>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: "27px"
  }
}))(MuiDialogContent);

export default function DialogModal({ dialogTitle, children, onClose, open }) {
  return (
    <div>
      <CustomDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          {dialogTitle}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </CustomDialog>
    </div>
  );
}
