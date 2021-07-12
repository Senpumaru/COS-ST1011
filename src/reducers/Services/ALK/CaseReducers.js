import {
  ST0001_CREATE_REQUEST,
  ST0001_CREATE_SUCCESS,
  ST0001_CREATE_FAIL,
  ST0001_CREATE_RESET,
  ST0001_UPDATE_REQUEST,
  ST0001_UPDATE_SUCCESS,
  ST0001_UPDATE_FAIL,
  ST0001_UPDATE_RESET,
  ST0001_DETAILS_REQUEST,
  ST0001_DETAILS_SUCCESS,
  ST0001_DETAILS_FAIL,
  ST0001_DETAILS_RESET,
  ST0001_TRANSFER_REQUEST,
  ST0001_TRANSFER_SUCCESS,
  ST0001_TRANSFER_FAIL,
  ST0001_APPROVAL_FAIL,
  ST0001_APPROVAL_REQUEST,
  ST0001_APPROVAL_SUCCESS,
  ST0001_DELETE_REQUEST,
  ST0001_DELETE_SUCCESS,
  ST0001_DELETE_FAIL,
  ST0001_LIST_REQUEST,
  ST0001_LIST_SUCCESS,
  ST0001_LIST_FAIL,
  ST0001_STATISTICS_REQUEST,
  ST0001_STATISTICS_SUCCESS,
  ST0001_STATISTICS_FAIL,
} from "../../../constants/Services/ALK/CaseConstants";
import { createAction, createReducer } from "@reduxjs/toolkit";

const initialCaseCreateState = {};

export const caseCreateReducerST0001 = createReducer(
  initialCaseCreateState,
  (builder) => {
    builder
      .addCase(ST0001_CREATE_REQUEST, (state, action) => {
        state.loadingCreate = true;
        state.successCreate = false;
        state.errorCreate = false;
      })
      .addCase(ST0001_CREATE_SUCCESS, (state, action) => {
        state.loadingCreate = false;
        state.successCreate = true;
        state.instance = action.payload;
      })
      .addCase(ST0001_CREATE_FAIL, (state, action) => {
        state.loadingCreate = false;
        state.successCreate = false;
        state.errorCreate = action.payload;
      })
      .addDefaultCase((state, action) => {
        state = {};
      });
  }
);

export const caseDetailsReducerALK = (state = { instance: {} }, action) => {
  switch (action.type) {
    case ST0001_DETAILS_REQUEST:
      return { ...state, loadingDetails: true };

    case ST0001_DETAILS_SUCCESS:
      return { loadingDetails: false, instance: action.payload };

    case ST0001_DETAILS_FAIL:
      return { loadingDetails: false, errorDetails: action.payload };

    case ST0001_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const caseUpdateReducerALK = (state = { instance: {} }, action) => {
  switch (action.type) {
    case ST0001_UPDATE_REQUEST:
      return { loadingUpdate: true };

    case ST0001_UPDATE_SUCCESS:
      return {
        loadingUpdate: false,
        successUpdate: true,
        instance: action.payload,
      };

    case ST0001_UPDATE_FAIL:
      return {
        loadingUpdate: false,
        errorUpdate: action.payload,
      };

    case ST0001_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const caseTransferReducerST0001 = (state = {}, action) => {
  switch (action.type) {
    case ST0001_TRANSFER_REQUEST:
      return { loadingTransfer: true };

    case ST0001_TRANSFER_SUCCESS:
      return {
        loadingTransfer: false,
        successTransfer: true,
      };

    case ST0001_TRANSFER_FAIL:
      return {
        loadingTransfer: false,
        errorTransfer: action.payload,
      };

    default:
      return state;
  }
};

export const approvalUpdateReducerST0001 = (state = {}, action) => {
  switch (action.type) {
    case ST0001_APPROVAL_REQUEST:
      return { loadingApproval: true };

    case ST0001_APPROVAL_SUCCESS:
      return {
        loadingApproval: false,
        successApproval: true,
      };

    case ST0001_APPROVAL_FAIL:
      return {
        loadingApproval: false,
        errorApproval: action.payload,
      };

    default:
      return state;
  }
};

export const caseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ST0001_DELETE_REQUEST:
      return { loadingDelete: true };

    case ST0001_DELETE_SUCCESS:
      return { loadingDelete: false, successDelete: true };

    case ST0001_DELETE_FAIL:
      return { loadingDelete: false, error: action.payload };

    default:
      return state;
  }
};

// Initial State
const initialState = { cases: [] };

export const caseListReducerALK = (state = initialState, action) => {
  switch (action.type) {
    case ST0001_LIST_REQUEST:
      return {
        cases: state.cases,
        loading: true,
      };

    case ST0001_LIST_SUCCESS:
      return {
        cases: action.payload,
        loading: false,
      };

    case ST0001_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// Initial State
export const caseStatisticsReducerALK = (state = {}, action) => {
  switch (action.type) {
    case ST0001_STATISTICS_REQUEST:
      return {
        caseStats: {
          cases_count: state.cases_count,
        },
        loadingStats: false,
      };

    case ST0001_STATISTICS_SUCCESS:
      return { loadingStats: false, caseStats: action.payload };

    case ST0001_STATISTICS_FAIL:
      return { loadingStats: false, errorStats: action.payload };

    default:
      return state;
  }
};
