import { request } from "@/utils";

export function getGoodsByIdAPI(params) {
  return request({
    url:'goods/getGoodsById',
    method:'POST',
    data: params
  })
}

export function createGoodsAPI(params) {
  return request({
    url:'goods/createGoods',
    method:'POST',
    data: params
  })
}

export function updateGoodsAPI(params) {
  return request({
    url:'goods/updateGoods',
    method:'POST',
    data: params
  })
}