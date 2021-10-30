import request from '@/utils/request'

export function getTech() {
  return request({
    url: '/getJson',
    method: 'get'
  })
}

export function upload(data) {
  return request({
    url: '/upload',
    method: 'post',
    data
  })
}