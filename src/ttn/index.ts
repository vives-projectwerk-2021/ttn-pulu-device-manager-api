import { identity_server, join_server, network_server, application_server} from './endpoints'
import { field_mask_paths } from './fieldMaskPaths'

interface EndDevice {
    ids: {
        device_id: string,
        dev_eui: string,
        join_eui: string,
        application_ids: { application_id: string }
    },
    name: string,
    description: string,
    root_keys: { app_key: { key: string } },
    network_server_address: string,
    application_server_address: string,
    join_server_address: string,
    lorawan_version: string,
    lorawan_phy_version: string,
    frequency_plan_id: string,
    supports_join: boolean
}
export { EndDevice }

function generate_error(err: any, origin: string) {
    return {
        message: err.message, 
        details: err.response.data,
        origin
    }
}

const ttn = {
    devices: {
        list: (application_id: string) => {
            return new Promise<any>((resolve, reject) => {
                identity_server.get(`/applications/${application_id}/devices`)
                .then( response => resolve(response.data) )
                .catch( err => reject(generate_error(err, 'identity_server')) )
            })
        },
        get: (application_id: string, device_id: string) => {
            return new Promise<any>((resolve, reject) => {
                identity_server.get(`/applications/${application_id}/devices/${device_id}`)
                .then( response => resolve(response.data) )
                .catch( err => reject(generate_error(err, 'identity_server')) )
            })
        },
        create: (end_device: EndDevice) => {
            function create_in_identity_server(end_device: EndDevice) {
                return new Promise<any>((resolve, reject) => {
                    identity_server.post(`/applications/${end_device.ids.application_ids.application_id}/devices`, {
                        end_device,
                        field_mask: { paths: field_mask_paths.identity_server }
                    })
                    .then( response => resolve(response.data) )
                    .catch( err => reject(generate_error(err, 'identity_server')) )
                })
            }
            function create_in_network_server(end_device: EndDevice) {
                return new Promise<any>((resolve, reject) => {
                    network_server.post(`/applications/${end_device.ids.application_ids.application_id}/devices`, {
                        end_device,
                        field_mask: { paths: field_mask_paths.network_server }
                    })
                    .then( response => resolve(response.data) )
                    .catch( err => reject(generate_error(err, 'network_server')) )
                })
            }
            function create_in_application_server(end_device: EndDevice) {
                return new Promise<any>((resolve, reject) => {
                    application_server.post(`/applications/${end_device.ids.application_ids.application_id}/devices`, {
                        end_device,
                        field_mask: { paths: field_mask_paths.application_server }
                    })
                    .then( response => resolve(response.data) )
                    .catch( err => reject(generate_error(err, 'application_server')) )
                })
            }
            function create_in_join_server(end_device: EndDevice) {
                return new Promise<any>((resolve, reject) => {
                    join_server.post(`/applications/${end_device.ids.application_ids.application_id}/devices`, {
                        end_device,
                        field_mask: { paths: field_mask_paths.join_server }
                    })
                    .then( response => resolve(response.data) )
                    .catch( err => reject(generate_error(err, 'join_server')) )
                })
            }

            return new Promise<any>(async (resolve, reject) => {
                Promise.all([
                    create_in_identity_server(end_device),
                    create_in_network_server(end_device),
                    create_in_application_server(end_device),
                    create_in_join_server(end_device)
                ])
                .then((results) => {
                    /*
                    let created = {}
                    for (const result of results) {
                        created = {...created, ...result}
                    }
                    resolve(created);
                    */
                    ttn.devices.get(end_device.ids.application_ids.application_id, end_device.ids.device_id)
                    .then( (device) => resolve(device) )
                    .catch( err => reject(err) )
                })
                .catch( err => reject(err) )
            })
        },
    }
}

export default ttn