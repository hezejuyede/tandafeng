import axios from 'axios';


const service = axios.create({
    baseURL:"",
    timeout: 5000
})



//http request 管理端请求拦截器
service.interceptors.request.use(config => {
        let token = JSON.parse(window.localStorage.getItem("token"));
        if (token) {
            config.headers = {"source_": "admin", 'Authorization': 'Bearer ' + token, "Content-Type": "application/json"}
        }
        else {
            config.headers = {
                "client_id": "webApp",
                "client_secret": "123456",
                "Content-Type": "application/json"
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


//http response 响应拦截器
service.interceptors.response.use(
    response => {
        if (response.data.code === 401 || response.data.code === 402) {
            this.$router.push("/login")
        }
        else {
            console.log("响应拦截器成功")

        }
        return response;
    },
    error => {
        this.$router.push("/login");
        return Promise.reject(error)
    }
);


export default service
