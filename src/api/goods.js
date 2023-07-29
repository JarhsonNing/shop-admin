import request from '@/utils/request.js'

export function listGoods() {
    return request.get('/item')
}

export function createGoods(data) {
    return request.post('/item', data, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    })
}

export function updateGoods(id, data) {
    return request.post('/item/' + id, data)
}

export function deleteGoods(id) {
    return request.delete('/item/' + id)
}
