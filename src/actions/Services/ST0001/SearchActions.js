import {
    ST0001_SEARCH_RESET,
    ST0001_SEARCH_PAGE,
    ST0001_SEARCH_PAGE_SIZE,
    ST0001_SEARCH_SORT,
    ST0001_SEARCH_FILTER_DATE_REGISTER_GTE,
    ST0001_SEARCH_FILTER_DATE_REGISTER_LTE,
    ST0001_SEARCH_FILTER_PERSONAL_NUMBER,
    ST0001_SEARCH_FILTER_INSTITUTION,
} from '../../../constants/Services/ALK/SearchConstants'

export const setSearchPage = (page) => async (dispatch) => {
    dispatch(
        {
            type: ST0001_SEARCH_PAGE,
            payload: page
        }
    )
}

export const setSearchPageSize = (pageSize) => async (dispatch) => {
    dispatch(
        {
            type: ST0001_SEARCH_PAGE_SIZE,
            payload: pageSize
        }
    )
}

export const setSearchSort = (sortColumn) => async (dispatch) => {
    dispatch(
        {
            type: ST0001_SEARCH_SORT,
            payload: sortColumn
        }
    )
}

export const setSearchFilterDateRegisterGTE = (keyword) => async (dispatch) => {
    dispatch(
        {
            type: ST0001_SEARCH_FILTER_DATE_REGISTER_GTE,
            payload: keyword
        }
    )

}

export const setSearchFilterDateRegisterLTE = (keyword) => async (dispatch) => {
    dispatch(
        {
            type: ST0001_SEARCH_FILTER_DATE_REGISTER_LTE,
            payload: keyword
        }
    )

}

export const setSearchFilterPersonalNumber = (keyword) => async (dispatch) => {
    dispatch(
        {
            type: ST0001_SEARCH_FILTER_PERSONAL_NUMBER,
            payload: keyword
        }
    )

}

export const setSearchFilterinstitution = (keyword) => async (dispatch) => {
    dispatch(
        {
            type: ST0001_SEARCH_FILTER_INSTITUTION,
            payload: keyword
        }
    )

}