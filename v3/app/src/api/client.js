import axios from 'axios'

const client = axios.create({
  baseURL: (window.frcV3Data?.apiUrl || '/wp-json/frc-v3/v1'),
  headers: { 'X-WP-Nonce': window.frcV3Data?.nonce || '', 'Content-Type': 'application/json' },
})
client.interceptors.response.use(r => r.data, e => Promise.reject(new Error(e.response?.data?.msg || e.message)))
export default client
