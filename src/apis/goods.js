import { request } from "@/utils";

export function getGoodsByIdAPI(params) {
  return request({
    url:'goods/getGoodsById',
    method:'POST',
    data: params
  })
}

export async function getGoodsListAPI(params) {
  return request({
    url:'goods/getGoodsList',
    method:'POST',
    data: params
  })
}

export function addGoodsAPI(params) {
  return request({
    url:'goods/addGoods',
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

export function delGoodsAPI(params) {
  return request({
    url:'goods/delGoods',
    method:'POST',
    data: params
  })
}