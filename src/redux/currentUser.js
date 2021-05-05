import 'axios'

const currentUserState = {
  user: null,
  collection: null,
  error: null,
};
/* 
export const fetchUserCollection =(videos){

} */

export const handleUser = (user) => {
  return { type: "HANDLE_USER", payload: user };
};

export const handleCollection = (data) => {
  return { type: "Z", payload: data };
};

const handleUserReducer = (state = currentUserState, action) => {
  switch (action.type) {
    case "HANDLE_USER":
      return { ...state, user: action.payload };
    case "Z":
      return { ...state, collection: action.payload };
    default:
      return state;
  }
};

export default handleUserReducer;
