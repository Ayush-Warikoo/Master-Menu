import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: `${process.env.REACT_APP_DEV_BASE_URL}`,
});

export default instance;
