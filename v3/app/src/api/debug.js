import client from './client.js'

export function debugRun(data) { return client.post('/debug/run', data) }
