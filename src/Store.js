import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"
import { userLoginReducer, userRegisterReducer } from './reducers/Accounts/UserReducers'
import { approvalUpdateReducerST0001, caseCreateReducerST0001, caseDetailsReducerALK, caseListReducerALK, caseStatisticsReducerALK, caseTransferReducerST0001, caseUpdateReducerALK } from './reducers/Services/ALK/CaseReducers'
import { searchReducerALK } from "./reducers/Services/ALK/SearchReducers"
import { caseCreateReducerPDL1, caseDetailsReducerPDL1, caseListReducerPDL1, caseUpdateReducerPDL1 } from './reducers/Services/PDL1/CaseReducers'
import { searchReducerPDL1 } from "./reducers/Services/PDL1/SearchReducers"



/*** All reducers ***/
const reducer = combineReducers({
    User: combineReducers({
        userRegister: userRegisterReducer,
        userLogin: userLoginReducer,
    }),
    ALK: combineReducers({
        caseCreate: caseCreateReducerST0001,
        caseDetails: caseDetailsReducerALK,
        caseUpdate: caseUpdateReducerALK,
        caseTransfer: caseTransferReducerST0001,
        caseList: caseListReducerALK,
        caseStatistics: caseStatisticsReducerALK,
        approvalUpdate: approvalUpdateReducerST0001,
        searchParameters: searchReducerALK,
    }),

    PDL1: combineReducers({
        caseCreate: caseCreateReducerPDL1,
        caseDetails: caseDetailsReducerPDL1,
        caseUpdate: caseUpdateReducerPDL1,
        caseList: caseListReducerPDL1,
        searchParameters: searchReducerPDL1,
    })
})

/* User Storage */
const userInfoFromStorage = sessionStorage.getItem('userInfo') ?
    JSON.parse(sessionStorage.getItem('userInfo')) : null

const initialState = {
    User: {
        userLogin: {
            userInfo: userInfoFromStorage
        }
    },
    ALK: {
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