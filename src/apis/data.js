import { request } from "@/utils/request";

export function getMonthTotalBySellerAPI(params) {
  return request({
    url:'data/getMonthTotalBySeller',
    method:'POST',
    data: params
  })
}

export function getHotGoodsBySellerAPI(params) {
  return request({
    url:'data/getHotGoodsBySeller',
    method:'POST',
    data: params
  })
}