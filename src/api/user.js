import request from '@/utils/request.js'

export function login(data) {
    return request.post('/user/login', data)
}
