import { request } from "@/utils/request";

export function loginAPI(params) {
  return request({
    url:'api/login',
    method:'POST',
    data: params
  })
}

export function registerAPI(params) {
  return request({
    url:'api/register',
    method:'POST',
    data: params
  })
}

export function logoutAPI(params) {
  return request({
    url:'api/logout',
    method:'POST',
    data: params
  })
}

export async function refreshTokenAPI(params) {
  return request({
    url:'api/refreshToken',
    method:'POST',
    data: params
  })
}