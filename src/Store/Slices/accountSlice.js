import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// State

/* Account Storage */
const accountStorage = localStorage.getItem("Account") ?
    JSON.parse(localStorage.getItem("Account")) : {}

export const initialState = {
  Loading: false,
  Success: false,
  Error: false,
  Info: accountStorage,
};


/* Slices */

const accountSlice = createSlice({
  name: "Account",
  initialState,
  reducers: {
    AccountLoading: (state, action) => {
      state.Loading = true;
    },
    Login: (state, action) => {
      state.Info = action.payload;
      state.Loading = false;
      state.Success = true;
    },
    Logout: (state, action) => {
      state.Info = initialState.Info;
      state.Loading = false;
      state.Success = false;
    },
    LoginError: (state, action) => {
      state.Loading = false;
      state.Error = true;
    },
  },
});

export const { AccountLoading, Logout, Login: LoginSuccess, LoginError } = accountSlice.actions;
export default accountSlice.reducer;

/* Actions */

const SERVER_URL = process.env.REACT_APP_API_SERVER;

// Account

export const loginAccount = (instance) => async (dispatch) => {
  dispatch(AccountLoading());
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Get USER Information
    const { data } = await axios.post(
      SERVER_URL + "api/account/login/",
      { email: instance["email"], password: instance["password"] },
      config
    );
    console.log("Account Data:", data);

    // Get USER Permission
    const permissions = await axios.get(SERVER_URL + `api/ST1011/permissions/${data.id}`, config);
    console.log("Permissions:", permissions);

    data["credentials"] = permissions.data;

    setTimeout(() => {
      dispatch(LoginSuccess(data));
    }, 3000);

    // Save user credentials in Browser Storage
    // localStorage.setItem('userInfo', JSON.stringify(data))
    if (instance["storage"]) {
      localStorage.setItem("Account", JSON.stringify(data));
    }

  } catch (error) {
    setTimeout(() => {
      console.log(error.message);
      console.log(error.response);
      dispatch(LoginError(error.response.data.error ? error.response.data.error : error.message));
    }, 3000);
  }
};

export const logoutAccount = () => async (dispatch) => {
  // Remove Profile data from network storage
  localStorage.removeItem("Account");
  // Remove Profile data from "STORE"
  dispatch(Logout());
};
