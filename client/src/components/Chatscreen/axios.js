import axios from 'axios';

const instance = axios.create({
    baseURL: "https://whispering-lake-00382.herokuapp.com",
});

export default instance;