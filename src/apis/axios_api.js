
import axios from "axios";

// the server port
// grab tokrn from localstorage, same name between all frontend == accToken
const storage = localStorage.LSToken;
console.log("api function")
const TOKEN = `bearer ${storage}`;
console.log(TOKEN)

const api = axios.create({
    baseURL: "https://myplaylist-app.herokuapp.com",

});

api.defaults.headers.common["Authorization"] = TOKEN;


export default api;