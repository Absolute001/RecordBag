const utilState = {
  clicked: false,
  pageFlag: 1,
};

export const clickHandler = (bool) => {
  return { type: "CLICK_HANDLER", payload: bool };
};

export const pageFlagHandler = (num = 0) => {
  return { type: "PAGE_FLAG_HANDLER", payload: num };
};

const utilReducer = (state = utilState, action) => {
  switch (action.type) {
    case "CLICK_HANDLER":
      return { ...state, clicked: action.payload };
    case "PAGE_FLAG_HANDLER":
      return {
        ...state,
        pageFlag: state.pageFlag + action.payload,
      };
    default:
      return state;
  }
};

export default utilReducer;
