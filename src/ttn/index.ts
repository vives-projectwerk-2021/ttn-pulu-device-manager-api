import { identity_server, join_server, network_server, application_server} from './endpoints'

const ttn = {
    devices: {
        list: (application_id: string) => {
            return new Promise<any>((resolve, reject) => {
                identity_server.get(`/applications/${application_id}/devices`)
                .then( response => resolve(response.data) )
                .catch( err => reject(err) )
            })
        },
        get: (application_id: string, device_id: string) => {
            return new Promise<any>((resolve, reject) => {
                identity_server.get(`/applications/${application_id}/devices/${device_id}`)
                .then( response => resolve(response.data) )
                .catch( err => reject(err) )
            })
        },
    }
}

export default ttn