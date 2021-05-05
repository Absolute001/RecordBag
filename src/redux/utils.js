const utilState = {
  clicked: false,
};

export const clickHandler = (bool) => {
  return { type: "CLICK_HANDLER", payload: bool };
};

const utilReducer = (state = utilState, action) => {
  switch (action.type) {
    case "CLICK_HANDLER":
      return { ...state, clicked: action.payload };
    default:
      return state;
  }
};

export default utilReducer;
