
import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: "https://us-central1-master-menu-app.cloudfunctions.net/api"
  //The API cloud function URL 
  //"http://localhost:5001/master-menu-app/us-central1/api"

});

export default instance;