import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"
import { userLoginReducer, userRegisterReducer } from './reducers/Accounts/UserReducers'
import { approvalUpdateReducer, caseCreateReducer, caseDetailsReducer, caseAddendumReducer, caseListReducer, caseStatisticsReducer, caseTransferReducer, caseUpdateReducer, caseDeclineReducer } from './reducers/Cases/CaseReducers'
import { searchReducer } from "./reducers/Cases/SearchReducers"




/*** All reducers ***/
const reducer = combineReducers({
    Profile: combineReducers({
        userRegister: userRegisterReducer,
        userLogin: userLoginReducer,
    }),
    ST1011: combineReducers({
        caseCreate: caseCreateReducer,
        caseDetails: caseDetailsReducer,
        caseUpdate: caseUpdateReducer,
        caseDecline: caseDeclineReducer,
        caseTransfer: caseTransferReducer,
        caseAddendum: caseAddendumReducer,
        caseList: caseListReducer,
        caseStatistics: caseStatisticsReducer,
        approvalUpdate: approvalUpdateReducer,
        searchParameters: searchReducer,
    }),
})

/* Profile Storage */
const userInfoFromStorage = sessionStorage.getItem('userInfo') ?
    JSON.parse(sessionStorage.getItem('userInfo')) : null

const initialState = {
    Profile: {
        userLogin: {
            userInfo: userInfoFromStorage
        }
    },
    ST1011: {
        caseStatistics: {
            caseStats: {
                cases_count: 0,
                cases_in_work: 0,
                cases_done: 0,
            }
        }
    }
}

/*** Middleware ***/
// Collect all middleware
const middleware = [thunk]
/* Create Store */
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store;