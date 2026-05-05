import client from './client.js'

export function getSettings()                 { return client.get('/kit/settings') }
export function saveCron(data)               { return client.post('/kit/cron', data) }
export function activation(code)             { return client.post('/kit/activation', { code }) }
export function functionSwitch(key)          { return client.post('/kit/function-switch', { key }) }
export function dbUpgrade(progress)          { return client.post('/kit/db-upgrade', { progress }) }
