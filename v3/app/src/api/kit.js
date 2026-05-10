import client from './client.js'

export function getSettings()                 { return client.get('/kit/settings') }
export function saveCron(data)               { return client.post('/kit/cron', data) }
export function activation()                  { return client.post('/kit/activation') }
export function functionSwitch(key)          { return client.post('/kit/function-switch', { key }) }
export function dbUpgrade(progress)          { return client.post('/kit/db-upgrade', { progress }) }
export function envCheck()                  { return client.get('/kit/env-check') }
export function getVersionMode()            { return client.get('/version-mode') }
export function saveVersionMode(mode)       { return client.post('/version-mode', { mode }) }
