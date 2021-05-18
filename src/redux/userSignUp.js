const userState = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  error: null,
};

/*THOSE ACTIONS HANDLES THE SIGN UP FORM */

export const fnameHandler = (value) => {
  return { type: "FNAME_HANDLER", payload: value };
};

export const lnameHandler = (value) => {
  return { type: "LNAME_HANDLER", payload: value };
};

export const emailHandler = (value) => {
  return { type: "EMAIL_HANDLER", payload: value };
};

export const passwordHandler = (value) => {
  return { type: "PASSWORD_HANDLER", payload: value };
};

export const errorSignUpHandler = (message) => {
  return { type: "ERROR_SIGNUP_HANDLER", payload: message };
};

export const resetSignUp = () => {
  return { type: "RESET_SIGNUP" };
};

const userSignUpReducer = (state = userState, action) => {
  switch (action.type) {
    case "FNAME_HANDLER":
      return {
        ...state,
        fname: action.payload,
      };
    case "LNAME_HANDLER":
      return {
        ...state,
        lname: action.payload,
      };
    case "EMAIL_HANDLER":
      return {
        ...state,
        email: action.payload,
      };
    case "PASSWORD_HANDLER":
      return {
        ...state,
        password: action.payload,
      };
    case "RESET_SIGNUP":
      return {
        fname: "",
        lname: "",
        email: "",
        password: "",
      };
    case "ERROR_SIGNUP_HANDLER":
      return {
        fname: "",
        lname: "",
        email: "",
        password: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userSignUpReducer;
