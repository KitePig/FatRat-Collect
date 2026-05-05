import client from './client.js'

export function getBuckets(params)         { return client.get('/data/buckets', { params }) }
export function getBucketsStats()         { return client.get('/data/buckets/stats') }
export function getDataDetail(optionId, params) { return client.get(`/data/buckets/${optionId}`, { params }) }
export function deleteDataItem(id)         { return client.delete(`/data/${id}`) }
export function getReleaseConfig(optionId) { return client.get(`/data/release-config/${optionId}`) }
export function saveReleaseConfig(optionId, data) { return client.post(`/data/release-config/${optionId}`, data) }
export function publishArticle(id)         { return client.post(`/data/${id}/publish`) }
export function previewArticle(id)         { return client.post(`/data/${id}/preview`) }
export function batchPublish(data)         { return client.post('/data/batch-publish', data) }
export function wechatPlay()               { return client.post('/data/play') }
