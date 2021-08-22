import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { caseDeclineAction } from "../../actions/Cases/CaseActions";

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

const SERVER_URL = process.env.REACT_APP_API_SERVER;

function DialogDecline(props) {
  const history = useHistory();

  /*** Material UI Styles ***/
  const classes = useStyles();
  /*** Redux States ***/
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.Profile["userLogin"]);
  const { userInfo } = userLogin;

  /*** Props ***/
  const {
    openDialog,
    setOpenDialog,
    // Data
    instance,
  } = props;

  /*** Local States ***/
  /* Form */
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  /** Case Decline **/
  // Close Dialog
  const handleCloseDialog = () => {
    console.log(props);
    setOpenDialog(false);
  };

  // Decline
  const DECLINE_CHOICES = [
    {
      value: "Несоответствие клиническим критериям",
      label: "Несоответствие клиническим критериям",
    },
    {
      value: "Нерепрезентативный материал",
      label: "Нерепрезентативный материал",
    },
    {
      value: "Материал старше 3 лет",
      label: "Материал старше 3 лет",
    },
    {
      value: "EGFR+ (НМРЛ)",
      label: "EGFR+ (НМРЛ)",
    },
    {
      value: "Повторное направление",
      label: "Повторное направление",
    },
    {
      value: "Не предоставлен материал",
      label: "Не предоставлен материал",
    },
  ];
  const [declineReason, setDeclineReason] = useState("");

  const declineCase = () => {
    const data = {};
    data["declineReason"] = declineReason;
    dispatch(caseDeclineAction(data));
    history.push("/ST1011");
  };

  return (
    <Dialog open={openDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle className={classes.dialogHeader} id="delivery-dialog-title">
        <Typography className={classes.dialogTitle}>Отказ кейса</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography component={"span"} className={classes.dialogSubTitle}>
            Внимание!
          </Typography>
          <br />
          Данное решение приведет к отказу кейса. Укажите причину отказа, для последующего оформления.
          <Grid item md={12} sm={12} xs={12}>
            <Controller
              name="declineReason"
              control={control}
              defaultValue={false}
              rules={{
                required: "Укажите причину отказа",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  select
                  label="Причина"
                  variant="outlined"
                  error={errors.declineReason ? true : false}
                  helperText={errors?.declineReason ? errors.declineReason.message : null}
                >
                  {DECLINE_CHOICES.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseDialog} color="primary">
          Не согласен
        </Button>
        <Button variant="outlined" onClick={declineCase} color="primary" autoFocus>
          Согласен
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogDecline;
