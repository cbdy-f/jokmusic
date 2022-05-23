import axios from "axios";

const request = axios.create({
    baseURL: "https://autumnfish.cn",
    // 代表请求超时的时间5s
    timeout: 5000,
});
//请求拦截器:在发请求之前,请求拦截器可以检测到
axios.interceptors.request.use(config => {
    return config
})

axios.interceptors.response.use(res => {
    return res.data
}), (error) => {
    return Promise.reject(new Error('faile'))
}


export default axios