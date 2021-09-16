import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import SpecTextField from "../../Components/TextField/SpecTextField";
import { loginAccount } from "../../Store/Slices/accountSlice";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://cos.omr/">
        COS (Centralized Oncology Services)
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  /*** React Router Dom ***/
  const history = useHistory();
  /* Redux Toolkit */
  const dispatch = useDispatch();

  const { Info, Loading, Error, Success } = useSelector((state) => state.Account);

  /*** React Hook Form ***/
  /* React Hook Form - Defaults */
  const defaultValues = {
    email: "",
    password: "",
    storage: false,
  };

  /* React Hook Form - Submit */
  const onSubmit = (data) => {
    console.log(data);
    history.push("/Menu");
    // React Hook Form Data Dispatch
    dispatch(loginAccount(data));
    if (Success) {
      reset();
    }
  };

  /* React Hook Form - Form */
  const methods = useForm({
    defaultValues,
    mode: "onSubmit",
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    formState,
    getValues,
    reset,
    trigger,
  } = methods;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          COS Авторизация
        </Typography>
        <Typography component="h2" variant="h6">
          Приложение: ИГХ - PD-L1
        </Typography>
        <form>
          <Box sx={{ mt: 1 }}>
            <Controller
              control={control}
              name="email"
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <SpecTextField
                  {...field}
                  fullWidth
                  margin="normal"
                  id="email"
                  label="Email"
                  autoComplete="email"
                  variant="standard"
                  error={errors.email ? true : false}
                  helperText={errors?.email && errors.email.message}
                  autoFocus
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <SpecTextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="standard"
                  error={errors.password ? true : false}
                  helperText={errors?.password && errors.password.message}
                />
              )}
            />
            <FormControlLabel
              control={
                <Controller
                  name="storage"
                  control={control}
                  render={({ field }) => (
                    <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />
                  )}
                />
              }
              label="Запомнить пользователя"
            />
            <Button fullWidth variant="contained" onClick={handleSubmit(onSubmit)} sx={{ mt: 3, mb: 2 }}>
              Авторизация
            </Button>

            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" color="primary.main">
                  Нет акканута? Пройдите регистрацию
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
