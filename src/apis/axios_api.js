
import axios from "axios";

// the server port
// grab tokrn from localstorage, same name between all frontend == accToken
const storage = localStorage.LSToken;
const TOKEN = `bearer ${storage}`;


const api = axios.create({
    baseURL: "https://myplaylist-app.herokuapp.com",

});

api.defaults.headers.common["Authorization"] = TOKEN;


export default api;