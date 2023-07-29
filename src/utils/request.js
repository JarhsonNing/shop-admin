import axios from 'axios';
import router from '@/router/index.js'
import {ElMessage} from 'element-plus'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: '/api',
    // 超时
    timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
    const token = localStorage.getItem('auth');
    if (token) {
        config.headers.setAuthorization(token)
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
        console.log(res.headers.getAuthorization())
        if (res.headers.getAuthorization()) {
            localStorage.setItem('auth', res.headers.getAuthorization())
        }
        return res.data
    },
    error => {
        if (error.response.status === 401) {
            ElMessage.error('登录失效，请重新登录')
            router.replace('/login')
        }
        return Promise.reject(error)
    }
)


export default service
