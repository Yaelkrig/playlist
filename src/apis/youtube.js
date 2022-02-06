import axios from "axios";
const KEY = 'AIzaSyCvzrgAvxMIJId6pv9V1b_GjsWIuE-vhDA';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 3,
        key: KEY
    }
})