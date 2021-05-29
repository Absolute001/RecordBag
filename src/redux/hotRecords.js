import appFirebase from "../firebase/firebase";

const hotRecordsState = {
  hotRecords: [],
  error: "",
};

export const fetchHotRecords = () => {
  return async (dispatch) => {
    try {
      const respFirestore = await appFirebase
        .firestore()
        .collection("hotRecords")
        .orderBy("likes", "desc")
        .limit(10)
        .get();
      dispatch({
        type: "FETCH_HOT_RECORDS",
        payload: respFirestore.docs.map((doc) => doc.data()),
      });
    } catch (e) {
      dispatch({
        type: "FETCH_HOT_RECORDS_ERROR",
        payload: e.message,
      });
    }
  };
};

const hotRecordsReducer = (state = hotRecordsState, action) => {
  switch (action.type) {
    case "FETCH_HOT_RECORDS":
      return { ...state, hotRecords: action.payload };
    case "FETCH_HOT_RECORDS_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default hotRecordsReducer;
