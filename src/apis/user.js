import { request } from "@/utils";

export function loginAPI(params) {
  return request({
    url:'/login',
    method:'POST',
    data: params
  })
}

export function registerAPI(params) {
  return request({
    url:'/register',
    method:'POST',
    data: params
  })
}