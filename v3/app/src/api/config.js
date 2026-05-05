import client from './client.js'

export function getConfigs(params)     { return client.get('/configs', { params }) }
export function getConfig(id)         { return client.get(`/configs/${id}`) }
export function createConfig(data)    { return client.post('/configs', data) }
export function updateConfig(id, data){ return client.put(`/configs/${id}`, data) }
export function deleteConfig(id)      { return client.delete(`/configs/${id}`) }
export function getStats()            { return client.get('/configs/stats') }
export function importDefaults()      { return client.post('/configs/import-defaults') }
export function getCategories()       { return client.get('/options/categories') }
export function getUsers()            { return client.get('/options/users') }
export function getPostTypes()        { return client.get('/options/post-types') }
