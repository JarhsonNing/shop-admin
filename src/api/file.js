import request from '@/utils/request.js'

export function saveFile(data) {
    return request.post('/file', data, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    })
}
