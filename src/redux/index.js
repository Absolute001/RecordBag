import { applyMiddleware, createStore, combineReducers } from "redux";
import fetchReducer from "./fetch";
import thunk from "redux-thunk";
import userSignUpReducer from "./userSignUp";
import userLogInReducer from "./userLogIn";
import handleUserReducer from "./currentUser";
import hotRecordsReducer from "./hotRecords";
import utilReducer from "./utils";

const rootReducer = combineReducers({
  globalState: fetchReducer,
  userSignUpState: userSignUpReducer,
  userLogInState: userLogInReducer,
  currentUser: handleUserReducer,
  utilState: utilReducer,
  hotRecordsState: hotRecordsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
