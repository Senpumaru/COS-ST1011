import DialogDelete from "../../Dialogs/DialogDelete";
import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
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
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Alert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import axios from "axios";
import ruLocale from "date-fns/locale/ru";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { caseDeleteAction, caseDetailsAction, caseUpdateAction } from "../../../actions/Cases/CaseActions";
import Loader from "../../Loader";
import DialogDecline from "../../Dialogs/DialogDecline";

const useStyles = makeStyles({
  cardTitle: {
    fontSize: 14,
  },
  formControl: {
    margin: 0,
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: 2,
  },
  alertTitle: {
    fontSize: "1.4rem",
    backgroundColor: "#F2AA4CFF",
    paddingRight: "2rem",
  },
});

/*** CHOICES ***/
const INSTITUTION_CHOICES = [
  {
    value: "УЗ «Брестский областной онкологический диспансер»",
    label: "УЗ «Брестский областной онкологический диспансер»",
  },
  {
    value: "УЗ «Гомельский областной клинический онкологический диспансер»",
    label: "УЗ «Гомельский областной клинический онкологический диспансер»",
  },
  {
    value: "УЗ «Витебский областной клинический онкологический диспансер»",
    label: "УЗ «Витебский областной клинический онкологический диспансер»",
  },
  {
    value: "УЗ «Могилёвский областной онкологический диспансер»",
    label: "УЗ «Могилёвский областной онкологический диспансер»",
  },
  {
    value: "УЗ «Гродненский областной онкологический диспансер»",
    label: "УЗ «Гродненский областной онкологический диспансер»",
  },
  {
    value: "УЗ «Минский городской клинический онкологический диспансер»",
    label: "УЗ «Минский городской клинический онкологический диспансер»",
  },
  {
    value: "УЗ «Барановичский онкологический диспансер»",
    label: "УЗ «Барановичский онкологический диспансер»",
  },
  {
    value: "УЗ «Бобруйский межрайонный онкологический диспансер»",
    label: "УЗ «Бобруйский межрайонный онкологический диспансер»",
  },
];

const SERVER_URL = process.env.REACT_APP_API_SERVER;

function UpdateForm({ history, match }) {
  const classes = useStyles();
  const caseUUID = match.params.id;

  /*** Local States ***/
  /* Registration Data */

  const [blockCodeList, setBlockCodeList] = useState([{ blockCode: "" }]);
  const [slideCodeList, setSlideCodeList] = useState([{ slideCode: "" }]);

  /* Block Codes States */
  // Add Block numbers
  const handleBlockListChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...blockCodeList];
    list[index][name] = value;
    setBlockCodeList(list);
  };
  const handleAddBlock = () => {
    setBlockCodeList([...blockCodeList, { blockCode: "" }]);
  };
  const handleRemoveBlock = (index) => {
    const list = [...blockCodeList];
    list.splice(index, 1);
    setBlockCodeList(list);
  };
  /* Slide Codes States */
  // Add Slide numbers
  const handleSlideListChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...slideCodeList];
    list[index][name] = value;
    setSlideCodeList(list);
  };
  const handleAddSlide = () => {
    setSlideCodeList([...slideCodeList, { slideCode: "" }]);
  };
  const handleRemoveSlide = (index) => {
    const list = [...slideCodeList];
    list.splice(index, 1);
    setSlideCodeList(list);
  };

  /*** Redux States ***/
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.Profile["userLogin"]);
  const { userInfo } = userLogin;

  const caseDetails = useSelector((state) => state.ST1011["caseDetails"]);
  const { loadingDetails, errorDetails, instance } = caseDetails;

  const caseUpdate = useSelector((state) => state.ST1011["caseUpdate"]);
  const { loadingUpdate, errorUpdate, successUpdate } = caseUpdate;

  /* Data Extraction */
  // Block & Slide Codes
  const blockCodes = [];
  const slideCodes = [];

  if (instance?.block_codes && instance?.slide_codes) {
    for (const item in instance.block_codes) {
      blockCodes.push({ blockCode: instance.block_codes[item] });
    }

    for (const item in instance.slide_codes) {
      slideCodes.push({ slideCode: instance.slide_codes[item] });
    }
  }

  // Pathologist & Consultants choices
  const [caseConsultantsValues, setConsultantsValues] = useState([]);
  const [caseEditor, setCaseEditor] = useState("");

  const [pathologists, setPathologists] = useState([]);
  const [consultants, setConsultants] = useState([]);

  useEffect(async () => {
    const fetchData = async () => {
      const pathologists = await axios(SERVER_URL + `api/ST1011/pathologists`);
      const consultants = await axios(SERVER_URL + `api/ST1011/consultants`);

      setConsultants(
        consultants.data.map(function (item) {
          return item.user;
        })
      );
      setPathologists(
        pathologists.data.map(function (item) {
          return item.user;
        })
      );
    };
    fetchData();
  }, []);

  /** DETAILS **/
  useEffect(() => {
    if (!instance || instance.uuid !== caseUUID) {
      dispatch(caseDetailsAction(match.params.id));
    } else {
      // Registration Data
      setValue("dateDispatch", instance.date_of_dispatch);
      setValue("dateAcquisition", instance.date_of_acquisition);
      setValue("institution", instance.institution);
      setValue("personalNumber", instance.personal_number);
      setValue("dateBirth", instance.date_of_birth);
      setValue("lastName", instance.last_name);
      setValue("middleName", instance.middle_name);
      setValue("firstName", instance.first_name);

      setBlockCodeList(blockCodes);
      setValue("blockCount", instance.block_count);
      setSlideCodeList(slideCodes);
      setValue("slideCount", instance.slide_count);

      setValue("diagnosis", instance.diagnosis);
      setValue("caseSender", instance.case_sender);
      setCaseEditor(instance.case_editor);
      setConsultantsValues(instance.case_consultants);
      // Report Data
      if (instance.date_of_response != null) {
        setValue("dateReport", instance.date_of_response);
      } else {
        setValue("dateReport", new Date());
      }
      setValue("cancerCellPercentage", instance.cancer_cell_percentage);
      setValue("immuneCellPercentage", instance.immune_cell_percentage);

      if (instance.clinical_interpretation != null) {
        setValue("clinicalInterpretation", instance.clinical_interpretation);
      } else {
        setValue("clinicalInterpretation", "");
      }
    }
  }, [instance, dispatch]);

  /** PUT **/
  const onSubmit = (data, event) => {
    data["uuid"] = caseUUID;
    // Date of Dispatch
    if (typeof data["dateDispatch"] != "string") {
      data["dateDispatch"] = data["dateDispatch"].toISOString().split("T")[0];
    } else {
      data["dateDispatch"] = data["dateDispatch"];
    }
    // Date of Acquisition
    if (typeof data["dateAcquisition"] != "string") {
      data["dateAcquisition"] = data["dateAcquisition"].toISOString().split("T")[0];
    } else {
      data["dateAcquisition"] = data["dateAcquisition"];
    }
    // Date of Birth
    if (typeof data["dateBirth"] != "string") {
      data["dateBirth"] = data["dateBirth"].toISOString().split("T")[0];
    } else {
      data["dateBirth"] = data["dateBirth"];
    }

    data["blockCodes"] = blockCodeList.map((a) => a.blockCode);
    data["slideCodes"] = slideCodeList.map((a) => a.slideCode);
    if (caseEditor != null) {
      data["caseEditor"] = caseEditor["id"];
    } else {
      data["caseEditor"] = null;
    }
    data["caseConsultants"] = caseConsultantsValues;
    if (data["caseConsultants"]) {
      data["caseConsultants"] = data["caseConsultants"].map((a) => a.id);
    } else {
      data["caseConsultants"] = [];
    }

    dispatch(caseUpdateAction(data));
  };

  /** DECLINE **/
  const [openDeclineDialog, setOpenDeclineDialog] = React.useState(false);

  const handleOpenDeclineDialog = () => {
    setOpenDeclineDialog(true);
  };

  /** DELETE **/
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  /* Form submission */
  const defaultValues = {};

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ mode: "onBlur" }, defaultValues);

  /* Validators */

  // Update button control
  function UpdateButtonChoice() {
    if (instance) {
      if (userInfo.credentials["pathologist"] && userInfo.id === instance?.case_editor?.id) {
        return (
          <Button variant="contained" type="submit" color="primary">
            Оформить кейс
          </Button>
        );
      } else if (
        (userInfo.credentials["registrar"] || userInfo.credentials["clinician"]) &&
        (userInfo.id === instance?.case_creator?.id || userInfo.id === instance?.case_assistant?.id)
      ) {
        return (
          <Button disabled={false} variant="contained" type="submit" color="primary">
            Исправить кейс
          </Button>
        );
      } else if (
        userInfo.credentials["consultant"] &&
        instance?.case_consultants?.map((a) => a.id).includes(userInfo.id)
      ) {
        return (
          <Button
            disabled={false}
            color="primary"
            // onClick={}
            variant="contained"
          >
            Утвердить
          </Button>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  // Decline Dialogue Choice
  function DeclineButtonChoice() {
    if (instance) {
      if (userInfo.id === instance?.case_editor?.id) {
        return (
          <Button color="primary" onClick={handleOpenDeclineDialog} variant="contained">
            Отказ кейса
          </Button>
        );
      } else {
        return null;
      }
    }
  }

  // Delete button control
  function DeleteButtonChoice() {
    if (instance) {
      if (userInfo.id === instance?.case_editor?.id) {
        return (
          <Button color="secondary" onClick={handleOpenDeleteDialog} variant="contained">
            Удалить кейс
          </Button>
        );
      } else if (
        (userInfo.credentials["registrar"] || userInfo.credentials["clinician"]) &&
        userInfo.id === instance?.case_creator?.id
      ) {
        return (
          <Button color="secondary" onClick={handleOpenDeleteDialog} variant="contained">
            Удалить кейс
          </Button>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  return (
    <Box pt={2} pb={2}>
      {loadingUpdate || loadingDetails ? (
        <Loader>Загрузка...</Loader>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Card>
            <CardContent>
              <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                <strong>Форма заполнения</strong>
              </Typography>
              <Grid container item direction={"row"} alignItems={"flex-start"} justify={"flex-start"}>
                <Grid container item xs={12} spacing={1}>
                  <Grid item md={4} sm={6} xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                      <Controller
                        name="dateDispatch"
                        control={control}
                        rules={{
                          required: "Укажите",
                        }}
                        render={({ field: { ref, ...rest } }) => (
                          <KeyboardDatePicker
                            {...rest}
                            fullWidth
                            animateYearScrolling
                            defaultChecked={false}
                            id="dateDispatch-id"
                            label="Дата направления"
                            format="dd/MM/yyyy"
                            maxDate={new Date()}
                            variant="inline"
                            inputVariant="outlined"
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        )}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                      <Controller
                        name="dateAcquisition"
                        control={control}
                        rules={{
                          required: "Укажите",
                        }}
                        render={({ field: { ref, ...rest } }) => (
                          <KeyboardDatePicker
                            {...rest}
                            fullWidth
                            id="dateAcquisition-id"
                            label="Дата получения материала"
                            format="dd/MM/yyyy"
                            maxDate={new Date()}
                            variant="inline"
                            inputVariant="outlined"
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        )}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item md={8} sm={12} xs={12}>
                    <Controller
                      name="institution"
                      defaultValue={""}
                      control={control}
                      rules={{
                        required: "Укажите организацию",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          select
                          name="institution"
                          label="Организация"
                          variant="outlined"
                          error={errors.institution ? true : false}
                          helperText={errors?.institution ? errors.institution.message : `Code: ${field.value}`}
                        >
                          {INSTITUTION_CHOICES.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <Controller
                      name="personalNumber"
                      control={control}
                      rules={{
                        required: "Укажите личный номер",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          id="personalNumber-id"
                          label="Личный номер"
                          name="personalNumber"
                          color="primary"
                          variant="outlined"
                          error={errors.personalNumber ? true : false}
                          helperText={errors?.personalNumber && errors.personalNumber.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                      <Controller
                        name="dateBirth"
                        control={control}
                        render={({ field: { ref, ...rest } }) => (
                          <KeyboardDatePicker
                            {...rest}
                            fullWidth
                            id="date-birth"
                            label="Дата рождения"
                            format="dd/MM/yyyy"
                            maxDate={new Date()}
                            variant="inline"
                            inputVariant="outlined"
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        )}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item md={4} sm={4} xs={12}>
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{
                        required: "Обязательное поле",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          id="lastName-id"
                          label="Фамилия"
                          name="lastName"
                          color="primary"
                          variant="outlined"
                          error={errors.lastName ? true : false}
                          helperText={errors?.lastName && errors.lastName.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={4} sm={4} xs={12}>
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{
                        required: "Обязательное поле",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          id="firstName-id"
                          label="Имя"
                          name="firstName"
                          color="primary"
                          variant="outlined"
                          error={errors.firstName ? true : false}
                          helperText={errors?.firstName && errors.firstName.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={4} sm={4} xs={12}>
                    <Controller
                      name="middleName"
                      control={control}
                      rules={{
                        required: "Обязательное поле",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          id="middleName-id"
                          label="Отчество"
                          name="middleName"
                          color="primary"
                          variant="outlined"
                          error={errors.middleName ? true : false}
                          helperText={errors?.middleName && errors.middleName.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                    <Controller
                      name="diagnosis"
                      control={control}
                      defaultValue={""}
                      rules={{
                        maxLength: {
                          value: 200,
                          message: "Слишком много символов",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          name="diagnosis"
                          inputProps={{ type: "text" }}
                          label="Диагноз"
                          variant="outlined"
                          error={errors.diagnosis ? true : false}
                          helperText={errors?.diagnosis && errors.diagnosis.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <Controller
                      render={(props) => (
                        <Autocomplete
                          id="caseEditor-id"
                          options={pathologists}
                          getOptionLabel={(option) => option.first_name + " " + option.last_name}
                          // getOptionSelected={(option, value) => option.first_name === value.first_name}
                          filterSelectedOptions
                          value={caseEditor} // value is passed by render from the Controller
                          onChange={(event, value) => setCaseEditor(value)} // instead here the docs said to do: onChange={e => props.onChange(e.target.checked)}
                          // inputValue={pathologistValue}
                          // onInputChange={(event, newPathologistValue) => {
                          //     setPathologistValue(newPathologistValue);
                          // }}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              {...params}
                              label="Патолог"
                              name="caseEditor"
                              placeholder="Выбрать патолога"
                              variant="outlined"
                            />
                          )}
                        />
                      )}
                      control={control}
                      name="caseEditor"
                      defaultValue={""} // this prevents the "controlled/uncontrolled change" error
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <Controller
                      name="caseSender"
                      defaultValue={""}
                      control={control}
                      rules={{
                        maxLength: {
                          value: 50,
                          message: "Слишком много символов",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          inputProps={{ type: "text" }}
                          label="Направивший врач"
                          variant="outlined"
                          error={errors.doctorSender ? true : false}
                          helperText={errors?.doctorSender && errors.doctorSender.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
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
                </Grid>
                <hr />
                <Grid container item direction={"row"} alignItems={"flex-start"} justify={"flex-start"} spacing={1}>
                  <Grid container item xs={12}>
                    <Grid item xs={6}>
                      Блоки
                    </Grid>
                    <Grid item xs={6}>
                      Слайды
                    </Grid>
                  </Grid>
                  <Grid container item sm={6} xs={12} spacing={1}>
                    {blockCodeList.map((item, index) => {
                      return (
                        <Grid item key={index} md={6} sm={12} xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="blockCode"
                            label="Блок"
                            value={item.blockCode}
                            onChange={(event) => handleBlockListChange(event, index)}
                          />

                          {blockCodeList.length !== 1 && (
                            <Button type="button" onClick={() => handleRemoveBlock(index)}>
                              Удалить
                            </Button>
                          )}
                          {blockCodeList.length - 1 === index && (
                            <Button type="button" onClick={handleAddBlock}>
                              Добавить
                            </Button>
                          )}
                        </Grid>
                      );
                    })}

                    <Grid container item xs={12} sm={12} xs={12}>
                      <Grid item xs={6} sm={6} xs={12}>
                        <Controller
                          name="blockCount"
                          defaultValue={""}
                          control={control}
                          rules={{
                            required: "Обязательное поле",
                            pattern: {
                              value: /\d*/i,
                              message: "Только цифры разрешены",
                            },
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              inputProps={{ min: 0, max: 20, type: "number" }}
                              label="Кол. блоков"
                              variant="outlined"
                              error={errors.blockCount ? true : false}
                              helperText={errors?.blockCount && errors.blockCount.message}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container item sm={6} xs={12} spacing={1}>
                    {slideCodeList.map((item, index) => {
                      return (
                        <Grid item key={index} md={6} sm={12} xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="slideCode"
                            label="Блок"
                            value={item.slideCode}
                            onChange={(event) => handleSlideListChange(event, index)}
                          />
                          {slideCodeList.length !== 1 && (
                            <Button type="button" onClick={() => handleRemoveSlide(index)}>
                              Удалить
                            </Button>
                          )}
                          {slideCodeList.length - 1 === index && (
                            <Button type="button" onClick={handleAddSlide}>
                              Добавить
                            </Button>
                          )}
                        </Grid>
                      );
                    })}
                    <Grid container item xs={12} sm={12} xs={12} spacing={1}>
                      <Grid item xs={6} sm={6} xs={12}>
                        <Controller
                          name="slideCount"
                          defaultValue={""}
                          control={control}
                          rules={{
                            required: "Обязательное поле",
                            pattern: {
                              value: /\d*/i,
                              message: "Incorrect pattern",
                            },
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              inputProps={{ min: 0, max: 30, type: "number" }}
                              label="Кол. слайдов"
                              variant="outlined"
                              error={errors.slideCount ? true : false}
                              helperText={errors?.slideCount && errors.slideCount.message}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {instance?.case_editor &&
                  userInfo?.credentials["pathologist"] &&
                  userInfo.id === instance?.case_editor?.id ? (
                    <React.Fragment>
                      <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                        <strong>Форма заключения</strong>
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item md={12} sm={12} xs={12}>
                          <Controller
                            name="clinicalInterpretation"
                            control={control}
                            defaultValue={""}
                            rules={{
                              required: "Обязательное поле",
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                select
                                name="clinicalInterpretation"
                                label="Клиническая интерпретация"
                                id="demo-simple-select-outlined"
                                // value={clinicalInterpretation}
                                defaultValue={""}
                                variant="outlined"
                                error={errors.clinicalInterpretation ? true : false}
                                helperText={errors?.clinicalInterpretation && errors.clinicalInterpretation.message}

                                // onChange={(event) => setclinicalInterpretation(event.target.value)}
                              >
                                <MenuItem value={"PD-L1 позитивный"}>PD-L1 позитивный</MenuItem>
                                <MenuItem value={"PD-L1 негативный"}>PD-L1 негативный</MenuItem>
                              </TextField>
                            )}
                          />
                        </Grid>
                        <Grid item xs={6} sm={6} xs={12}>
                          <Controller
                            name="immuneCellPercentage"
                            defaultValue={0}
                            control={control}
                            rules={{
                              required: "Обязательное поле",
                              pattern: {
                                value: /\d*/i,
                                message: "Incorrect pattern",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                inputProps={{
                                  min: 0,
                                  max: 100,
                                  type: "number",
                                }}
                                label="Показатель экспрессии PD-L1 опухолевыми клетками"
                                variant="outlined"
                                error={errors.immuneCellPercentage ? true : false}
                                helperText={errors?.immuneCellPercentage && errors.immuneCellPercentage.message}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6} sm={6} xs={12}>
                          <Controller
                            name="cancerCellPercentage"
                            defaultValue={0}
                            control={control}
                            rules={{
                              required: "Обязательное поле",
                              pattern: {
                                value: /\d*/i,
                                message: "Incorrect pattern",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                inputProps={{
                                  min: 0,
                                  max: 100,
                                  type: "number",
                                }}
                                label="Показатель экспрессии PD-L1 иммунными клетками"
                                variant="outlined"
                                error={errors.cancerCellPercentage ? true : false}
                                helperText={errors?.cancerCellPercentage && errors.cancerCellPercentage.message}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={4} s={4} xs={4}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                            <Controller
                              name="dateReport"
                              control={control}
                              rules={{
                                required: "Обязталеьное поле",
                              }}
                              defaultValue={new Date()}
                              render={({ field: { ref, ...rest } }) => (
                                <KeyboardDatePicker
                                  {...rest}
                                  fullWidth
                                  id="date-response"
                                  label="Дата заключения"
                                  format="dd/MM/yyyy"
                                  variant="inline"
                                  inputVariant="outlined"
                                  maxDate={new Date()}
                                  KeyboardButtonProps={{
                                    "aria-label": "change date",
                                  }}
                                />
                              )}
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  ) : (
                    <Box pt={2}>
                      <Alert variant="filled" severity="info">
                        Информация о заключении недоступна.
                      </Alert>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </CardContent>
            <Box pl={2} pr={2}>
              {successUpdate ? (
                <Alert variant="filled" severity="success">
                  Обновление успешно!
                </Alert>
              ) : (
                errorUpdate && <Alert severity="error">{errorUpdate}</Alert>
              )}
            </Box>
            <Grid container spacing={1}>
              <Grid item>
                <UpdateButtonChoice />
              </Grid>
              <Grid item>
                <DeclineButtonChoice />
                <DialogDecline
                  instance={instance}
                  openDialog={openDeclineDialog}
                  setOpenDialog={setOpenDeclineDialog}
                />
              </Grid>
              <Grid item>
                <DeleteButtonChoice />
                <DialogDelete instance={instance} openDialog={openDeleteDialog} setOpenDialog={setOpenDeleteDialog} />
              </Grid>
            </Grid>
          </Card>
        </form>
      )}
    </Box>
  );
}

export default UpdateForm;
