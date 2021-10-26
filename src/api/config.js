import request from '@/utils/request'

export function getTech() {
  return request({
    url: '/getJson',
    method: 'get'
  })
}
