import request from '@/utils/request.js'

export function listOrder(params) {
    return request.get('/order', {
        params
    })
}
