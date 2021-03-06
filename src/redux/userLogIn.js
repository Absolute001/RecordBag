const userState = {
  email: "",
  password: "",
  error: null,
};

/*THOSE ACTIONS HANDLES THE LOGIN FORM */

export const emailLoginHandler = (value) => {
  return { type: "EMAIL_LOGIN_HANDLER", payload: value };
};

export const passwordLoginHandler = (value) => {
  return { type: "PASSWORD_LOGIN_HANDLER", payload: value };
};

export const resetLogin = () => {
  return { type: "RESET_LOGIN" };
};

export const errorLoginHandler = (message) => {
  return { type: "ERROR_LOGIN_HANDLER", payload: message };
};

const userLoginReducer = (state = userState, action) => {
  switch (action.type) {
    case "EMAIL_LOGIN_HANDLER":
      return { ...state, email: action.payload };
    case "PASSWORD_LOGIN_HANDLER":
      return { ...state, password: action.payload };
    case "RESET_LOGIN":
      return { ...state, email: "", password: "" };
    case "ERROR_LOGIN_HANDLER":
      return {
        email: "",
        password: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userLoginReducer;
