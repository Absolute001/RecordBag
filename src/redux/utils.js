const utilState = {
  clicked: { add: false, clipboard: false, hotRecord: false },
  pageFlag: 1,
};

export const clickClipboardHandler = (bool) => {
  return { type: "CLICK_CLIPBOARD_HANDLER", payload: bool };
};

export const clickAddHandler = (bool) => {
  return { type: "CLICK_ADD_HANDLER", payload: bool };
};

export const clickHotRecordHandler = (bool) => {
  return { type: "CLICK_HOTRECORD_HANDLER", payload: bool };
};

export const pageFlagHandler = (num = 0) => {
  return { type: "PAGE_FLAG_HANDLER", payload: num };
};

export const pageFlagReset =()=>{
  return { type: "PAGE_FLAG_RESET" };
}

const utilReducer = (state = utilState, action) => {
  switch (action.type) {
    case "CLICK_ADD_HANDLER":
      return {
        ...state,
        clicked: { ...state.clicked, add: action.payload },
      };
    case "CLICK_CLIPBOARD_HANDLER":
      return {
        ...state,
        clicked: { ...state.clicked, clipboard: action.payload },
      };
    case "CLICK_HOTRECORD_HANDLER":
      return {
        ...state,
        clicked: { ...state.clicked, hotRecord: action.payload },
      };
    case "PAGE_FLAG_HANDLER":
      return {
        ...state,
        pageFlag: state.pageFlag + action.payload,
      };
    case "PAGE_FLAG_RESET":
      return {
        ...state,
        pageFlag: 1,
      };
    default:
      return state;
  }
};

export default utilReducer;
