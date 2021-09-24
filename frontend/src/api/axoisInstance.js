import axios from "axios";

const instance = axios.create({
    baseURL: "http://ec2-52-78-154-227.ap-northeast-2.compute.amazonaws.com",
    timeout: 5000,
    headers: {"Content-type": "application/json"}
})

instance.interceptors.request.use(
    function(config) {
        return config;
    },
    function(err) {
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    function(res) {
        return res;
    },
    function(err) {
        return Promise.reject(err);
    }
);

export default instance;