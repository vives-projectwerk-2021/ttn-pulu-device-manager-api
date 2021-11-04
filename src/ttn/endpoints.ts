import axios, { AxiosInstance } from 'axios'
import config from '../config'

const authorization = `Bearer ${config.ttn.api_key}`
const baseURL = 'https://eu1.cloud.thethings.network/api/v3'

const identity_server: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Authorization': authorization
    }
})

const join_server: AxiosInstance = axios.create({
    baseURL: `${baseURL}/js`,
    headers: {
        'Authorization': authorization
    }
})

const network_server: AxiosInstance = axios.create({
    baseURL: `${baseURL}/ns`,
    headers: {
        'Authorization': authorization
    }
})

const application_server: AxiosInstance = axios.create({
    baseURL: `${baseURL}/as`,
    headers: {
        'Authorization': authorization
    }
})

export { identity_server, join_server, network_server, application_server }