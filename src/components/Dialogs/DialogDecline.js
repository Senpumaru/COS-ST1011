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
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

  const [caseConsultantsValues, setConsultantsValues] = useState([]);
  const [consultants, setConsultants] = useState([]);

  useEffect(async () => {
    const fetchData = async () => {
      const consultants = await axios(SERVER_URL + `api/ST1011/consultants`);

      setConsultants(
        consultants.data.map(function (item) {
          return item.user;
        })
      );
    };
    fetchData();
  }, []);

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
  const handleChange = (event) => {
    setDeclineReason(event.target.value);
  };

  const declineCase = () => {
    const data = {};
    data["uuid"] = instance.uuid;
    data["declineReason"] = declineReason;
    data["caseConsultants"] = caseConsultantsValues;
    if (data["caseConsultants"]) {
      data["caseConsultants"] = data["caseConsultants"].map((a) => a.id);
    } else {
      data["caseConsultants"] = [];
    }
    console.log(data);
    dispatch(caseDeclineAction(data));
    // history.push("/ST1011");
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
          <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12}>
              <TextField
                fullWidth
                select
                value={declineReason ? declineReason : ""}
                onChange={handleChange}
                defaultValue=""
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
            </Grid>
            {instance?.case_consultants?.length > 0 ? null : (
              <Grid item md={12} sm={12} xs={12}>
                <Typography component={"span"}>
                  Для кейса оствутсвутют присовенные коснультанты. Укажите коснульантов для последующего оформления.
                </Typography>
                <Autocomplete
                  id="consultants-id"
                  defaultValue={[]}
                  multiple
                  options={consultants}
                  getOptionLabel={(option) => option.first_name + " " + option.last_name}
                  // getOptionSelected={(option, value) => option.first_name === value.first_name}
                  filterSelectedOptions
                  value={caseConsultantsValues} // value is passed by render from the Controller
                  onChange={(event, value) => setConsultantsValues(value)} // instead here the docs said to do: onChange={e => props.onChange(e.target.checked)}
                  // inputValue={consultantValue}
                  // onInputChange={(event, newConsultantValue) => {
                  // setConsultantValue(newConsultantValue);
                  // }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      inputProps={{
                        ...params.inputProps,
                        required: consultants.length === 0,
                      }}
                      label="Консультанты"
                      name="consultants"
                      placeholder="Выбрать консультантов"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseDialog} color="primary">
          Отмена
        </Button>
        <Button variant="outlined" onClick={declineCase} color="primary" autoFocus>
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogDecline;
