import axios from 'axios'

// var http = axios.create({
//     headers: {
//         'Content-Type': 'application/json;charset=UTF-8',
//     },
//     responseType: 'json'
// })

// function apiAxios(method, url, params) {
//     return new Promise((resolve) => {
//         http({
//             method,
//             url,
//             data: method == 'POST' ? params : '',
//             params: method == 'GET' ? params : '',
//             headers: {
//                 'token': ''
//             }
//         }).then(res => {
//             resolve(res)
//         })
//     })
// }

// export default {
//     get: function (url, params, res) {
//         return apiAxios('GET', url, params, res)
//     },
//     post: function (url, params, response) {
//         return apiAxios('POST', url, params, response)
//     },
//     put: function (url, params, response) {
//         return apiAxios('PUT', url, params, response)
//     },
//     delete: function (url, params, response) {
//         return apiAxios('DELETE', url, params, response)
//     }
// }


// create an axios instance
const service = axios.create({
    baseURL: 'https://tysq666.cn/conn1',
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service