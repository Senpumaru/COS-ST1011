import axios from "axios";
import {
  ST0001_CREATE_FAIL,
  ST0001_CREATE_REQUEST,
  ST0001_CREATE_SUCCESS,
  ST0001_CREATE_RESET,
  ST0001_TRANSFER_FAIL,
  ST0001_TRANSFER_REQUEST,
  ST0001_TRANSFER_SUCCESS,
  ST0001_APPROVAL_FAIL,
  ST0001_APPROVAL_REQUEST,
  ST0001_APPROVAL_SUCCESS,
  ST0001_DETAILS_FAIL,
  ST0001_DETAILS_REQUEST,
  ST0001_DETAILS_RESET,
  ST0001_DETAILS_SUCCESS,
  ST0001_DELETE_FAIL,
  ST0001_DELETE_REQUEST,
  ST0001_DELETE_SUCCESS,
  ST0001_LIST_FAIL,
  ST0001_LIST_REQUEST,
  ST0001_LIST_SUCCESS,
  ST0001_UPDATE_FAIL,
  ST0001_UPDATE_REQUEST,
  ST0001_UPDATE_SUCCESS,
  ST0001_UPDATE_RESET,
  ST0001_STATISTICS_REQUEST,
  ST0001_STATISTICS_SUCCESS,
  ST0001_STATISTICS_FAIL,
} from "../../../constants/Services/ALK/CaseConstants";

export const createCase = (instance) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ST0001_CREATE_REQUEST,
    });

    const state = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state["User"].userLogin["userInfo"].token}`,
      },
    };

    // Axios CSRF security
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.defaults.withCredentials = true;

    const { data } = await axios.post(
      "/api/ST0001/cases/create/",
      instance,
      config // Credentials etc.
    );

    setTimeout(() => {
      dispatch({
        type: ST0001_CREATE_SUCCESS,
        payload: data,
      });
    }, 1000);
    
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: ST0001_CREATE_FAIL,
        payload:
          error.response && error.response.data.Detail
            ? error.response.data.Detail
            : error.message,
      });
    }, 1000);
  }
};

export const caseDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ST0001_DETAILS_REQUEST,
    });

    const state = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state["User"].userLogin["userInfo"].token}`,
      },
    };

    // ID is specified in API URL
    const { data } = await axios.get(`/api/ST0001/cases/${id}/update/`, config);

    setTimeout(() => {
      dispatch({
        type: ST0001_DETAILS_SUCCESS,
        payload: data,
      });
    }, 2000);
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: ST0001_DETAILS_FAIL,
        payload:
          error.response && error.response.data.Detail
            ? error.response.data.Detail
            : error.message,
      });
    }, 2000);
  }
};

export const caseTransferAction = (instance) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ST0001_TRANSFER_REQUEST,
    });

    const state = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state["User"].userLogin["userInfo"].token}`,
      },
    };

    const { data } = await axios.put(
      `/api/ST0001/cases/${instance.uuid}/transfer/`,
      instance,
      config
    );

    setTimeout(() => {
      dispatch({
        type: ST0001_TRANSFER_SUCCESS,
        payload: data,
      });
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: ST0001_TRANSFER_FAIL,
        payload:
          error.response && error.response.data.Detail
            ? error.response.data.Detail
            : error.message,
      });
    }, 2000);
  }
};

export const approvalUpdateAction =
  (instance) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ST0001_APPROVAL_REQUEST,
      });

      const state = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state["User"].userLogin["userInfo"].token}`,
        },
      };

      const { data } = await axios.put(
        `/api/ST0001/approval/${instance.id}/update/`,
        instance,
        config
      );

      setTimeout(() => {
        dispatch({
          type: ST0001_APPROVAL_SUCCESS,
          payload: data,
        });
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        dispatch({
          type: ST0001_APPROVAL_FAIL,
          payload:
            error.response && error.response.data.Detail
              ? error.response.data.Detail
              : error.message,
        });
      }, 2000);
    }
  };

export const caseUpdateAction = (instance) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ST0001_UPDATE_REQUEST,
    });

    const state = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state["User"].userLogin["userInfo"].token}`,
      },
    };

    const { data } = await axios.put(
      `/api/ST0001/cases/${instance.uuid}/update/`,
      instance,
      config
    );
    setTimeout(() => {
      dispatch({
        type: ST0001_UPDATE_SUCCESS,
        payload: data,
      });
    }, 1000);

    setTimeout(() => {
      dispatch({
        type: ST0001_UPDATE_RESET,
      });
    }, 5000);

    dispatch({
      type: ST0001_DETAILS_RESET,
    });
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: ST0001_UPDATE_FAIL,
        payload:
          error.response && error.response.data.Detail
            ? error.response.data.Detail
            : error.message,
      });
    }, 2000);
  }
};

export const caseDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ST0001_DELETE_REQUEST,
    });

    const state = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state["User"].userLogin["userInfo"].token}`,
      },
    };

    await axios.delete(`/api/ST0001/cases/${id}/update/`, config);

    dispatch({
      type: ST0001_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ST0001_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listCases = (
  page = 1,
  pageSize = 10,
  sortColumn = "date_of_registration",
  filterDateRegisterGTE = null,
  filterDateRegisterLTE = null,
  filterInstitution = ""
) => {
  return async function (dispatch, getState) {
    // Promise
    try {
      // Request Promise
      dispatch({
        type: ST0001_LIST_REQUEST,
      });
      // Promise Async action

      const baseUrl = "/api/ST0001/cases/list/";
      const pageVar = `?page=${page}`;
      const pageSizeVar = `&page_size=${pageSize}`;
      const sortColumnVar = `&ordering=${sortColumn}`;
      const filterDateRegisterGTEVar = `&date_of_registration_gte=${filterDateRegisterGTE}`;
      const filterDateRegisterLTEVar = `&date_of_registration_lte=${filterDateRegisterLTE}`;
      const filterInstitutionVar = `&institution_code=${filterInstitution}`;

      const url = baseUrl.concat(
        pageVar,
        pageSizeVar,
        sortColumnVar,
        filterDateRegisterGTEVar,
        filterDateRegisterLTEVar,
        filterInstitutionVar
      );

      const state = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state["User"].userLogin["userInfo"].token}`,
        },
      };

      const { data } = await axios.get(url, config);
      // Deliver Promise

      setTimeout(() => {
        dispatch({
          type: ST0001_LIST_SUCCESS,
          payload: data,
        });
      }, 1000);

      // Error
    } catch (error) {
      dispatch({
        type: ST0001_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const statisticsCases = () => {
  return async function (dispatch, getState) {
    // Promise
    try {
      // Request Promise
      dispatch({
        type: ST0001_STATISTICS_REQUEST,
      });
      // Promise Async action
      const state = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state["User"].userLogin["userInfo"].token}`,
        },
      };

      const { data } = await axios.get("/api/ST0001/cases/statistics/", config);
      // Deliver Promise

      setTimeout(() => {
        dispatch({
          type: ST0001_STATISTICS_SUCCESS,
          payload: data,
        });
      }, 1000);

      // Error
    } catch (error) {
      dispatch({
        type: ST0001_STATISTICS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
