import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Autocomplete, Checkbox, Grid, ListItem, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import PatientAutocomplete from "../../Fields/PatientAutocomplete";
import SpecTextField from "../../TextField/SpecTextField";

const SERVER_URL = process.env.REACT_APP_API_SERVER;

async function findPatients({ queryKey: [_, term] }) {
  const response = await fetch(`${SERVER_URL}api/ST0001/patients?search=${term}`);
  const json = await response.json();
  const words = (json || []).map(({ word }) => word).sort();
  console.log("Words:", json);
  return words;
}

function RegisterForm() {
  /*** Redux States ***/
  const dispatch = useDispatch();

  // Account Information
  const { Info } = useSelector((state) => state.Account["Info"]);

  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext();

  /* Consultants Autocompletion choices */
  const [pathologistServerList, setPathologistServerList] = useState([]);
  
  const [consultantServerList, setConsultantServerList] = useState([]);
  // Selected values
  const [pathologistValue, setPathologistValue] = useState("");

  const [consultantsValues, setConsultantsValues] = useState([]);
  // Data Fetching
  useEffect(async () => {
    const fetchData = async () => {
      const pathologists = await axios(SERVER_URL + `api/ST1011/pathologists`);
      const consultants = await axios(SERVER_URL + `api/ST1011/consultants`);
      setPathologistServerList(
        pathologists.data.map(function (item) {
          return item.user;
        })
      );
      setConsultantServerList(
        consultants.data.map(function (item) {
          return item.user;
        })
      );
    };
    fetchData();
  }, []);

  return (
    <Grid container>
      <Grid item md={12}>
        <Typography color="primary" gutterBottom>
          <strong>Пациент</strong>
        </Typography>
      </Grid>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name="date_of_dispatch"
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field: { ref, ...rest } }) => (
            <DatePicker {...rest} label="Basic example" renderInput={(params) => <SpecTextField {...params} />} />
          )}
        />
        <Controller
          name="date_of_acquisition"
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field: { ref, ...rest } }) => (
            <DatePicker {...rest} label="Basic example" renderInput={(params) => <SpecTextField {...params} />} />
          )}
        />
        <Controller
          control={control}
          name="personal_number"
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <SpecTextField
              {...field}
              fullWidth
              key="Confirmation Code"
              id="Ambulatory ID-TextField"
              label="Личный номер"
              color="primary"
              error={errors.personal_number ? true : false}
              helperText={errors?.personal_number && errors.personal_number.message}
            />
          )}
        />
        <PatientAutocomplete control={control} />
        <Grid item md={4} sm={6} xs={12}>
          <Controller
            render={(props) => (
              <Autocomplete
                id="caseEditor-id"
                options={pathologistServerList}
                getOptionLabel={(option) => option.last_name + " " + option.first_name}
                renderOption={(props, option, { selected }) => (
                  <ListItem key={option.uuid} {...props}>
                    <Checkbox
                      icon={<FontAwesomeIcon icon={faUser} />}
                      checkedIcon={<FontAwesomeIcon icon={faUser} />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    <React.Fragment>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography>
                            ФИО: {option.last_name} {option.first_name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  </ListItem>
                )}
                // getOptionSelected={(option, value) =>
                //   option.first_name === value.first_name
                // }

                filterSelectedOptions
                // value={props.first_name} // value is passed by render from the Controller
                onChange={(e, value) => setValue("caseEditor", value)} // instead here the docs said to do: onChange={e => props.onChange(e.target.checked)}
                inputValue={pathologistValue}
                onInputChange={(event, newPathologistValue) => {
                  setPathologistValue(newPathologistValue);
                }}
                renderInput={(params) => (
                  <SpecTextField
                    fullWidth
                    {...params}
                    label="Укажите патолога"
                    name="caseEditor"
                    placeholder="Выбрать патолога"
                    variant="outlined"
                  />
                )}
              />
            )}
            control={control}
            name="case_editor"
            // defaultValue={null} // this prevents the "controlled/uncontrolled change" error
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Controller
            render={(props) => (
              <Autocomplete
                id="caseEditor-id"
                options={consultantServerList}
                getOptionLabel={(option) => option.last_name + " " + option.first_name}
                renderOption={(props, option, { selected }) => (
                  <ListItem key={option.uuid} {...props}>
                    <Checkbox
                      icon={<FontAwesomeIcon icon={faUser} />}
                      checkedIcon={<FontAwesomeIcon icon={faUser} />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    <React.Fragment>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography>
                            ФИО: {option.last_name} {option.first_name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  </ListItem>
                )}
                // getOptionSelected={(option, value) =>
                //   option.first_name === value.first_name
                // }

                filterSelectedOptions
                // value={props.first_name} // value is passed by render from the Controller
                onChange={(e, value) => setValue("caseEditor", value)} // instead here the docs said to do: onChange={e => props.onChange(e.target.checked)}
                inputValue={consultantsValues}
                onInputChange={(event, newConsultantValue) => {
                  setConsultantsValues(newConsultantValue);
                }}
                renderInput={(params) => (
                  <SpecTextField
                    fullWidth
                    {...params}
                    label="Укажите патолога"
                    name="caseEditor"
                    placeholder="Выбрать патолога"
                    variant="outlined"
                  />
                )}
              />
            )}
            control={control}
            name="case_consultants"
            // defaultValue={null} // this prevents the "controlled/uncontrolled change" error
          />
        </Grid>
      </LocalizationProvider>
    </Grid>
  );
}

export default RegisterForm;
