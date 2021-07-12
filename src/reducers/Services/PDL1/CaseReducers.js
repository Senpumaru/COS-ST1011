import {
    ST0002_CREATE_REQUEST,
    ST0002_CREATE_SUCCESS,
    ST0002_CREATE_FAIL,
    ST0002_CREATE_RESET,

    ST0002_UPDATE_REQUEST,
    ST0002_UPDATE_SUCCESS,
    ST0002_UPDATE_FAIL,
    ST0002_UPDATE_RESET,

    ST0002_DETAILS_REQUEST,
    ST0002_DETAILS_SUCCESS,
    ST0002_DETAILS_FAIL,
    ST0002_DETAILS_RESET,

    ST0002_DELETE_REQUEST,
    ST0002_DELETE_SUCCESS,
    ST0002_DELETE_FAIL,

    ST0002_LIST_REQUEST,
    ST0002_LIST_SUCCESS,
    ST0002_LIST_FAIL,
} from '../../../constants/Services/PDL1/CaseConstants'


export const caseCreateReducerPDL1 = (state = { success: false, }, action) => {
    switch (action.type) {
        case ST0002_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
            }
        case ST0002_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                instance: action.payload
            }
        case ST0002_CREATE_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload
            }
        case ST0002_CREATE_RESET:
            return {} // Return empty state
        default:
            return state
    }
}


export const caseDetailsReducerPDL1 = (state = { instance: {} }, action) => {
    switch (action.type) {
        case ST0002_DETAILS_REQUEST:
            return { ...state, loadingDetails: true }

        case ST0002_DETAILS_SUCCESS:
            return { loadingDetails: false, instance: action.payload }

        case ST0002_DETAILS_FAIL:
            return { loadingDetails: false, errorDetails: action.payload }

        case ST0002_DETAILS_RESET:
                return { }

        default:
            return state
    }
}


export const caseUpdateReducerPDL1 = (state = { instance: {} }, action) => {
    switch (action.type) {
        case ST0002_UPDATE_REQUEST:
            return { loadingUpdate: true }

        case ST0002_UPDATE_SUCCESS:
            return {
                loadingUpdate: false,
                successUpdate: true,
                instance: action.payload
            }

        case ST0002_UPDATE_FAIL:
            return {
                loadingUpdate: false,
                errorUpdate: action.payload
            }

        case ST0002_UPDATE_RESET:
            return { }

        default:
            return state
    }
}

export const caseDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ST0002_DELETE_REQUEST:
            return { loadingDelete: true }

        case ST0002_DELETE_SUCCESS:
            return { loadingDelete: false, successDelete: true }

        case ST0002_DELETE_FAIL:
            return { loadingDelete: false, error: action.payload }

        default:
            return state
    }
}

// Initial State
const initialState = { cases: [] };

export const caseListReducerPDL1 = (state = initialState, action) => {
    switch (action.type) {
        case ST0002_LIST_REQUEST:
            return { loading: true, cases: [] }

        case ST0002_LIST_SUCCESS:
            return { loading: false, cases: action.payload }

        case ST0002_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state

    }
}