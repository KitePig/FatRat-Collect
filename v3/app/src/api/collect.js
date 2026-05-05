import client from './client.js'

export function collectCustom(data)   { return client.post('/collect/custom', data) }
export function collectList(data)     { return client.post('/collect/list', data) }
export function collectDetail(data)   { return client.post('/collect/detail', data) }
export function collectHistory(data)  { return client.post('/collect/history', data) }
export function collectAll(data)      { return client.post('/collect/all', data) }
export function collectWechatHistory(data) { return client.post('/collect/wechat-history', data) }
