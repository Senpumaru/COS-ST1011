import {
    ST0002_SEARCH_RESET,
    
    ST0002_SEARCH_PAGE,
    ST0002_SEARCH_PAGE_SIZE,
    ST0002_SEARCH_SORT,
    ST0002_SEARCH_FILTER_DATE_REGISTER_LTE,
    ST0002_SEARCH_FILTER_PERSONAL_NUMBER,
    ST0002_SEARCH_FILTER_REGION,
    

} from '../../../constants/Services/PDL1/SearchConstants'

export const setSearchPage = (page) => async (dispatch) => {
    dispatch(
        {
            type: ST0002_SEARCH_PAGE,
            payload: page
        }
    )
    localStorage.setItem('page', JSON.stringify(page))
}

export const setSearchPageSize = (pageSize) => async (dispatch) => {
    dispatch(
        {
            type: ST0002_SEARCH_PAGE_SIZE,
            payload: pageSize
        }
    )
    localStorage.setItem('pageSize', JSON.stringify(pageSize))
}

export const setSearchSort = (sortColumn) => async (dispatch) => {
    dispatch(
        {
            type: ST0002_SEARCH_SORT,
            payload: sortColumn
        }
    )
    localStorage.setItem('sortColumn', JSON.stringify(sortColumn))
}

export const setSearchFilterDateRegister = (keyword) => async (dispatch) => {
    dispatch(
        {
            type: ST0002_SEARCH_FILTER_DATE_REGISTER_LTE,
            payload: keyword
        }
    )

}

export const setSearchFilterPersonalNumber = (keyword) => async (dispatch) => {
    dispatch(
        {
            type: ST0002_SEARCH_FILTER_PERSONAL_NUMBER,
            payload: keyword
        }
    )

}

export const setSearchFilterRegion = (keyword) => async (dispatch) => {
    dispatch(
        {
            type: ST0002_SEARCH_FILTER_REGION,
            payload: keyword
        }
    )

}