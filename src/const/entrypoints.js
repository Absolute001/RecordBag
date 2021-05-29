import axios from "axios";

export const youtube = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
});

export const discogs = axios.create({
  baseURL: "https://api.discogs.com/",
});
