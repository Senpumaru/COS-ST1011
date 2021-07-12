import {
  ST0002_SEARCH_RESET,
  ST0002_SEARCH_PAGE,
  ST0002_SEARCH_PAGE_SIZE,
  ST0002_SEARCH_SORT,
  ST0002_SEARCH_FILTER_DATE_REGISTER_LTE,
  ST0002_SEARCH_FILTER_PERSONAL_NUMBER,
  ST0002_SEARCH_FILTER_REGION,
  

} from '../../../constants/Services/PDL1/SearchConstants'

const initialStateSearch = {
  page: 1,
  pageSize: 10,
  sortColumn: "-date_of_registration",
  filters: {
    "dateRegister": new Date(),
    "personalNumber": "",
    "region": ""
  }
}

/*** Search Page ***/
export const searchReducerPDL1 = (state = initialStateSearch, action) => {
  switch (action.type) {
    case ST0002_SEARCH_PAGE:
      return { ...state, page: action.payload }
    case ST0002_SEARCH_PAGE_SIZE:
      return {
        ...state,
        page: 1,
        pageSize: action.payload
      }
    case ST0002_SEARCH_SORT:
      return { ...state, sortColumn: action.payload }
    case ST0002_SEARCH_FILTER_DATE_REGISTER_LTE:
      return {
        ...state,
        page: 1,
        filters: {
          "dateRegister": action.payload,
          "personalNumber": state.filters.personalNumber,
          "region": state.filters.region
        }
      }
    case ST0002_SEARCH_FILTER_PERSONAL_NUMBER:
      return {
        ...state,
        page: 1,
        filters: {
          "dateRegister": state.filters.dateRegister,
          "personalNumber": action.payload,
          "region": state.filters.region
        }
      }
    case ST0002_SEARCH_FILTER_REGION:
      return {
        ...state,
        page: 1,
        filters: {
          "dateRegister": state.filters.dateRegister,
          "personalNumber": state.filters.personalNumber,
          "region": action.payload
        }
      }
    case ST0002_SEARCH_RESET:
      return []
    default:
      return state;
  }
}
