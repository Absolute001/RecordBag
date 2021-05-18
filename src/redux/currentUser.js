
const currentUserState = {
  user: null,
  collection: null,
  error: null,
};

export const handleUser = (user) => {
  return { type: "HANDLE_USER", payload: user };
};

export const handleCollection = (data) => {
  return { type: "HANDLE_COLLECTION", payload: data };
};

const handleUserReducer = (state = currentUserState, action) => {
  switch (action.type) {
    case "HANDLE_USER":
      return { ...state, user: action.payload };
    case "HANDLE_COLLECTION":
      return { ...state, collection: action.payload };
    default:
      return state;
  }
};

export default handleUserReducer;
