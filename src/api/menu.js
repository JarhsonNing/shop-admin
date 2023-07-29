import request from '@/utils/request.js'

export function listMenu(params) {
    return request.get('/menu', {
        params
    })
}

export function createMenu(data) {
    return request.post('/menu', data)
}

export function detailMenu(data) {
    return request.get('/menu/' + data.id)
}
export function updateMenu(data) {
    return request.post('/menu/' + data.id, data)
}

export function deleteMenu(data) {
    return request.delete('/menu/' + data.id)
}
