import { applyMiddleware, createStore, combineReducers } from "redux";
import fetchReducer from "./fetch";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userSignUpReducer from "./userSignUp";
import userLogInReducer from "./userLogIn";
import handleUserReducer from "./currentUser";
import utilReducer from "./utils";



const rootReducer = combineReducers({
  globalState: fetchReducer,
  userSignUpState: userSignUpReducer,
  userLogInState: userLogInReducer,
  currentUser: handleUserReducer,
  utilState: utilReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
