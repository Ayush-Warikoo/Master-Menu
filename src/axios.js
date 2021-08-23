
import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: `${process.env.REACT_APP_DEV_BASE_URL}`
  //The API cloud function URL 
  //Test: "http://localhost:5001/master-menu-app/us-central1/api"
  //Dev: "https://us-central1-master-menu-app.cloudfunctions.net/api"

});

export default instance;