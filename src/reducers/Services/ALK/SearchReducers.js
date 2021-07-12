import {
  ST0001_SEARCH_PAGE,
  ST0001_SEARCH_PAGE_SIZE,
  ST0001_SEARCH_SORT,
  ST0001_SEARCH_FILTER_DATE_REGISTER_GTE,
  ST0001_SEARCH_FILTER_DATE_REGISTER_LTE,
  ST0001_SEARCH_FILTER_PERSONAL_NUMBER,
  ST0001_SEARCH_FILTER_INSTITUTION,
  ST0001_SEARCH_RESET,

} from '../../../constants/Services/ALK/SearchConstants'

const currentDate = new Date();

const initialStateSearch = {
  page: 1,
  pageSize: 10,
  sortColumn: "-date_of_registration",

  filters: {
    "dateRegisterGTE": currentDate,
    "dateRegisterLTE": currentDate,
    "personalNumber": "",
    "institution": ""
  }
}

/*** Search Page ***/
export const searchReducerALK = (state = initialStateSearch, action) => {
  switch (action.type) {
    case ST0001_SEARCH_PAGE:
      return {
        ...state,
        page: action.payload
      }
    case ST0001_SEARCH_PAGE_SIZE:
      return {
        ...state,
        page: 1,
        pageSize: action.payload
      }
    case ST0001_SEARCH_SORT:
      return {
        ...state,
        sortColumn: action.payload
      }
    case ST0001_SEARCH_FILTER_DATE_REGISTER_GTE:
      return {
        ...state,
        page: 1,
        filters: {
          "dateRegisterGTE": action.payload,
          "dateRegisterLTE": state.filters.dateRegisterLTE,

          "institution": state.filters.institution
        }
      }

    case ST0001_SEARCH_FILTER_DATE_REGISTER_LTE:
      return {
        ...state,
        page: 1,
        filters: {
          "dateRegisterGTE": state.filters.dateRegisterGTE,
          "dateRegisterLTE": action.payload,

          "institution": state.filters.institution
        }
      }
    case ST0001_SEARCH_FILTER_PERSONAL_NUMBER:
      return {
        ...state,
        page: 1,
        filters: {
          "dateRegisterGTE": state.filters.dateRegisterGTE,
          "dateRegisterLTE": state.filters.dateRegisterLTE,

          "institution": state.filters.institution
        }
      }
    case ST0001_SEARCH_FILTER_INSTITUTION:
      return {
        ...state,
        page: 1,
        filters: {
          "dateRegisterGTE": state.filters.dateRegisterGTE,
          "dateRegisterLTE": state.filters.dateRegisterLTE,

          "institution": action.payload
        }
      }
    case ST0001_SEARCH_RESET:
      return []
    default:
      return state;
  }
}
