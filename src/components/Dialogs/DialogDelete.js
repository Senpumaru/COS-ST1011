import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { caseDeleteAction } from "../../actions/Cases/CaseActions";

const useStyles = makeStyles({
  dialogHeader: {
    backgroundColor: "#F2AA4CFF",
  },
  dialogTitle: {
    fontWeight: 600,
    fontSize: "1.4rem",
    backgroundColor: "#F2AA4CFF",
  },
  dialogSubTitle: {
    fontWeight: 600,
    fontSize: "1.2rem",
    color: "#424242",
  },
  dialogText: {
    fontWeight: 400,
    fontSize: "1.0rem",
    color: "#424242",
  },
});

function DialogDelete(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  /*** Props ***/
  const {
    openDialog,
    setOpenDialog,
    // Data
    instance
    
  } = props;

  /** Case Delete **/
  // Close Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  // Delete
  const deleteCase = () => {
    dispatch(caseDeleteAction(instance.uuid));
    history.push("/ST1011");
  };

  return (
    
      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.dialogHeader} id="delivery-dialog-title">
        <Typography className={classes.dialogTitle}>Удаление кейса</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography component={"span"} className={classes.dialogSubTitle}>
              Внимание!
            </Typography>
            <br />
            Данное оповещение предназначено для защиты от случайного удаления объекта. Вы уверены что хотите удалить
            данный кейс?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDialog} color="primary">
            Не согласен
          </Button>
          <Button variant="outlined" onClick={deleteCase} color="primary" autoFocus>
            Согласен
          </Button>
        </DialogActions>
      </Dialog>
    
  );
}

export default DialogDelete;
