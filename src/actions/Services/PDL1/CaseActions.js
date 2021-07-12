import axios from 'axios';
import {
    ST0002_CREATE_FAIL, ST0002_CREATE_REQUEST,
    ST0002_CREATE_SUCCESS,

    ST0002_DELETE_FAIL, ST0002_DELETE_REQUEST,
    ST0002_DELETE_SUCCESS, ST0002_DETAILS_FAIL, ST0002_DETAILS_REQUEST,

    ST0002_DETAILS_RESET, ST0002_DETAILS_SUCCESS,

    ST0002_LIST_FAIL, ST0002_LIST_REQUEST,

    ST0002_LIST_SUCCESS, ST0002_UPDATE_FAIL, ST0002_UPDATE_REQUEST,
    ST0002_UPDATE_SUCCESS
} from '../../../constants/Services/PDL1/CaseConstants';


export const createCase = (instance) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ST0002_CREATE_REQUEST
        })

        const state = getState()  

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${state["User"].userLogin["userInfo"].token}`
            }
        }
        
        const { data } = await axios.post(
            "/api/servicePDL1/cases/create/",
            instance,
            config // Credentials etc.
        )
        setTimeout(() => {
            dispatch({
                type: ST0002_CREATE_SUCCESS,
                payload: data
            })
        }, 1000);

        // Test RESET



    } catch (error) {
        setTimeout(() => {
            dispatch({
                type: ST0002_CREATE_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
            })
        }, 1000);
        
    }
}

export const caseDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ST0002_DETAILS_REQUEST
        })

        // const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                // Authorization: `Bearer ${userInfo.token}`
            }
        }

        // ID is specified in API URL
        const { data } = await axios.get(`/api/servicePDL1/cases/${id}/update/`, config)

        setTimeout(() => {
            dispatch({
                type: ST0002_DETAILS_SUCCESS,
                payload: data
            })
        }, 1000);


    } catch (error) {
        dispatch({
            type: ST0002_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const caseUpdateAction = (instance) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ST0002_UPDATE_REQUEST
        })


        // const {userLogin: { userInfo },} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                // Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/servicePDL1/cases/${instance.uuid}/update/`,
            instance,
            config
        )
        setTimeout(() => {
            dispatch({
                type: ST0002_UPDATE_SUCCESS,
                payload: data
            })
        }, 1000);

        dispatch({
            type: ST0002_DETAILS_RESET,
        })

        


    } catch (error) {
        dispatch({
            type: ST0002_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const caseDeleteAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ST0002_DELETE_REQUEST
        })

        // const {userLogin: { userInfo },} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                // Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/api/servicePDL1/cases/${id}/update/`, config)

        dispatch({
            type: ST0002_DELETE_SUCCESS,

        })


        


    } catch (error) {
        dispatch({
            type: ST0002_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listCases = (
    page = 1,
    pageSize = 10,
    sortColumn = "date_updated",
    filterDateRegister = null,
    filterPersonalNumber = "",
    filterRegion = "",) => {


    return async function (dispatch) {
        // Promise
        try {
            // Request Promise
            dispatch({
                type: ST0002_LIST_REQUEST
            })
            // Promise Async action

            const baseUrl = "/api/servicePDL1/cases/list/"
            const pageVar = `?page=${page}`
            const pageSizeVar = `&page_size=${pageSize}`
            const sortColumnVar = `&ordering=${sortColumn}`
            const filterDateRegisterVar = `&date_of_registration_lte=${filterDateRegister}`
            const filterPersonalNumberVar = `&personal_number=${filterPersonalNumber}`
            const filterRegionVar = `&region=${filterRegion}`

            const url = baseUrl.concat(
                pageVar,
                pageSizeVar,
                sortColumnVar,
                filterDateRegisterVar,
                filterPersonalNumberVar,
                filterRegionVar
            )

            

            const { data } = await axios.get(url)
            // Deliver Promise
            
            setTimeout(() => {
                dispatch(
                    {
                        type: ST0002_LIST_SUCCESS,
                        payload: data
                    })
            }, 1000);

            

            // Error
        } catch (error) {
            dispatch({
                type: ST0002_LIST_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
    }
}