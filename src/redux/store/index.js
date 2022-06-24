import { legacy_createStore, combineReducers, compose, applyMiddleware } from "redux";
import creatSagaMiddleware from 'redux-saga'

import { LoginReducer } from "../reducer/loginReducer";
import rootSaga from "../saga";

const sagaMiddleware=creatSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer=combineReducers({
user: LoginReducer
})

const store= legacy_createStore(rootReducer,composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

export default store
