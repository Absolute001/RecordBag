import axios from "axios";
import appFirebase from "../firebase/firebase";

const globalState = {
  channel: [],
  shopVideos: [],
  playingVideo: "",
  loading: true,
  discogsRes: null,
  error: "",
};

const baseUrl = "https://youtube.googleapis.com/youtube/v3/";
const discogsBaseUrl = "https://api.discogs.com/";
const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
const discogsKey = process.env.REACT_APP_DISCOGS_KEY;
const discogsSecret = process.env.REACT_APP_DISCOGS_SECRET;

/* FETCH FROM YOUTUBE THE CHANNELS RETURNING THE CHANNEL INFOS NEEDED TO RENDER THEM */
export const fetchChannel = () => {
  return async (dispatch) => {
    dispatch({ type: "LOADING_HANDLER", payload: true });
    try {
      const respFirestore = await appFirebase
        .firestore()
        .collection("shops")
        .get();
      for (let i = 0; i < respFirestore.docs.length; i++) {
        await appFirebase
          .firestore()
          .collection("shops")
          .doc(respFirestore.docs[i].id)
          .get()
          .then((doc) =>
            dispatch({
              type: "FETCH_CHANNEL",
              payload: doc.data(),
            })
          );
      }
    } catch (e) {
      console.log(e.message);
    }
    dispatch({ type: "LOADING_HANDLER", payload: false });
  };
};

/* GIVEN THE CHANNEL ID FETCH THE CHANNELS VIDEOS FROM IT (MAX 50 ITEMS) AND RETURN RESULTS IN STATE TO RENDER THEM */
/* IF A CHANNEL HAS BEEN VISITED IT TAKES IT FROM THE LOCAL STORAGE */
export const fetchVideos = (channelId) => {
  return async (dispatch) => {
    dispatch({ type: "LOADING_HANDLER", payload: true });
    if (localStorage.getItem(channelId)) {
      dispatch({
        type: "FETCH_VIDEOS",
        payload: JSON.parse(localStorage.getItem(channelId)),
      });
    } else {
      await axios
        .get(
          `${baseUrl}search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=50&key=${apiKey}`
        )
        .then((res) => {
          localStorage.setItem(channelId, JSON.stringify(res.data.items));
          dispatch({ type: "FETCH_VIDEOS", payload: res.data.items });
        })
        .catch((e) => e.message);
    }
    dispatch({ type: "LOADING_HANDLER", payload: false });
  };
};

/* TO NOT LIMIT THE RESULTS ONLY FOR 50 ITEMS, IT FETCH THE NEXT 50 ITEMS (OR THE PREVIOUS) USING THE PAGE TOKEN GIVEN FROM THE YT API */
export const fetchPageHandler = (channelId, pageToken) => {
  return async (dispatch) => {
    dispatch({ type: "LOADING_HANDLER", payload: true });
    await axios
      .get(
        `${baseUrl}search?part=snippet&channelId=${channelId}&order=date&type=video&&pageToken=${pageToken}&maxResults=50&key=${apiKey}`
      )
      .then((res) => {
        dispatch({ type: "FETCH_VIDEOS", payload: res.data });
      });
    dispatch({ type: "LOADING_HANDLER", payload: false });
  };
};

/* THIS FUNCTION TRIES TO RETRIEVE DATA FROM DISCOGS MARKETPLACE API USING THE TITLE OF THE SELECTED VIDEO */
export const fetchDiscogs = (title) => {
  /* The algoritm to filter data  in order to search records on discogs API */
  const artist = title.includes("-")
    ? title.split("-")[0]
    : title.includes("–")
    ? title.split("–")[0]
    : title;
  const songTitle =
    title.includes("[") && title.includes("-")
      ? title
          .split("-")[1]
          .split(" ")
          .filter((element) => !element.includes("["))
          .join(" ")
      : title.split(" ")[1];
  const catNumberArr = title.split(" ");
  const catNumber = catNumberArr[catNumberArr.length - 1]
    .split("")
    .filter((element) => element !== "[" && element !== "]")
    .join("");

  return async (dispatch) => {
    dispatch({ type: "LOADING_HANDLER", payload: true });
    await axios
      .get(
        `${discogsBaseUrl}/database/search?${
          songTitle === ""
            ? `catno=${catNumber}&artist=${artist}`
            : `q=${artist}-${songTitle}`
        }&type=release&key=${discogsKey}&secret=${discogsSecret}`
      )
      .then((res) => dispatch({ type: "FETCH_DISCOGS", payload: res.data }))
      .catch((error) => dispatch({ type: "FETCH_DISCOGS", payload: error }));
    dispatch({ type: "LOADING_HANDLER", payload: false });
  };
};

/*THIS FUNCTION FETCH VIDEO FROM URL PARAMS IN CASE USER WANTS TO SHARE SOME RECORD ACROSS THE WEB */

export const fetchVideoFromParams = (videoId) => {
  return async (dispatch) => {
    await axios
      .get(
        ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
      )
      .then(async (res) => {
        const item = res.data.items[0];
        dispatch({
          type: "FETCH_VIDEOS_FROM_PARAMS",
          payload: {
            videoId: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.default.url,
          },
        });
        console.log(res.data);
        dispatch({ type: "LOADING_HANDLER", payload: false });
      });
  };
};

/* EVERYTIME SOMETHING NEEDS TIME TO BE COMPLETED WILL NEED THIS FUNCTION TO RENDER THE LOADING ANIMATION */
export const loadingHandler = (bool = true) => {
  return { type: "LOADING_HANDLER", payload: bool };
};

/*IT KEEPS STATE OF WICH VIDEO THE USER WANT TO SEE */
export const playingVideo = (videoId) => {
  return { type: "PLAYING_VIDEO", payload: videoId };
};

const fetchReducer = (state = globalState, action) => {
  switch (action.type) {
    case "LOADING_HANDLER":
      return { ...state, loading: action.payload };
    case "FETCH_CHANNEL":
      return {
        ...state,
        channel: [...state.channel, action.payload],
      };
    case "FETCH_VIDEOS":
      return { ...state, shopVideos: [action.payload] };
    case "PLAYING_VIDEO":
      return { ...state, playingVideo: action.payload };
    case "FETCH_DISCOGS":
      return { ...state, discogsRes: action.payload };
    case "FETCH_VIDEOS_FROM_PARAMS":
      return { ...state, playingVideo: action.payload };
    default:
      return state;
  }
};

export default fetchReducer;
