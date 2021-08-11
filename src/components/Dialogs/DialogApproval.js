import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

const useStyles = makeStyles({
  screenTitle: {
    fontSize: 16,
    fontWeight: 600,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 600,
    backgroundColor: "#F2AA4CFF",
    paddingRight: "0.1rem",
    margin: "0.2rem",
  },
  cardWarning: {
    fontSize: 18,
    fontWeight: 600,

    paddingRight: "0.1rem",
    margin: "0.2rem",
  },
  formControl: {
    margin: 0,
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: 2,
  },
  dialogTitle: {
    fontSize: "1.2rem",
    backgroundColor: "#F2AA4CFF",
  },
  dialogWarning: {
    fontSize: "1.0rem",
    color: "#424242",
  },
});

function DialogApproval(props) {
  const classes = useStyles();

  const {
    open: openApprovalDialogue,
  } = props;

  return (
    <Dialog
      open={openApprovalDialogue}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
        {"Утверждение кейса"}
        <IconButton aria-label="close" className={classes.icons} onClick={handleCloseApproveAlert}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Любое изменение в заключении данного кейса со стороны патолога приведет к обнулению вашего
          решения. Можете поменять решение в любое время до публикации данной версии кейса. При
          утверждении кейса всеми консультантами, кейс будет доступен для
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <FormLabel component="legend">Выбор</FormLabel>
        <RadioGroup
          aria-label="approval"
          name="approval"
          value={approvalChoice}
          onChange={handleApprovalChoice}
        >
          <Grid container>
            <Grid>
              <FormControlLabel value={"Yes"} control={<Radio />} label="Утверждаю" />
            </Grid>
            <Grid item>
              <FormControlLabel value={"No"} control={<Radio />} label="Не утверждаю" />
            </Grid>
          </Grid>
        </RadioGroup>
        <Button onClick={approveCase} color="secondary" variant="contained">
          Ответ
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogApproval;