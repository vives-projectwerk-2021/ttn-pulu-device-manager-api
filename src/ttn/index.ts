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
        details: err.response.data.message,
        origin
    }
}

const ttn = {
    devices: {
        list: (application_id: string) => {
            return new Promise<any>((resolve, reject) => {
                identity_server.get(
                    `/applications/${application_id}/devices`, 
                    { 
                        params: { field_mask: 'name,description' }
                    }
                )
                .then( response => resolve(response.data) )
                .catch( err => reject(generate_error(err, 'identity_server')) )
            })
        },
        get: (application_id: string, device_id: string, with_app_key: boolean = false) => {
            function get_device_info(application_id: string, device_id: string) {
                return new Promise<any>((resolve, reject) => {
                    identity_server.get(
                        `/applications/${application_id}/devices/${device_id}`, 
                        { 
                            params: { field_mask: 'name,description' }
                        }
                    )
                    .then( response => resolve(response.data) )
                    .catch( err => reject(generate_error(err, 'identity_server')) )
                })
            }
            function get_device_app_key(application_id: string, device_id: string) {
                return new Promise<any>((resolve, reject) => {
                    join_server.get(
                        `/applications/${application_id}/devices/${device_id}`, 
                        { 
                            params: { field_mask: 'root_keys.app_key.key' }
                        }
                    )
                    .then( response => resolve(response.data) )
                    .catch( err => reject(generate_error(err, 'identity_server')) )
                })
            }
            return new Promise<any>(async (resolve, reject) => {
                Promise.all([
                    get_device_info(application_id, device_id),
                    with_app_key?get_device_app_key(application_id, device_id):null
                ])
                .then( (results) => {
                    let result = {}
                    results.forEach(x=>result = {...result, ...x})
                    resolve(result)
                })
                .catch( err => reject(err) )
            })
        },
        update: (application_id: string, device_id: string, options: {name?: string, description?: string}) => {
            const end_device: any = {}
            if(options.name) end_device.name = options.name
            if(options.description) end_device.description = options.description
            return new Promise<any>((resolve, reject) => {
                identity_server.put(
                    `/applications/${application_id}/devices/${device_id}`,
                    {
                        end_device,
                        field_mask: { paths: Object.keys(end_device) }
                    }
                )
                .then( response => resolve(response.data) )
                .catch( err => reject(generate_error(err, 'identity_server')) )
            })
        },
        create: (end_device: EndDevice) => {
            function create_in_identity_server(end_device: EndDevice) {
                return new Promise<any>((resolve, reject) => {
                    identity_server.post(
                        `/applications/${end_device.ids.application_ids.application_id}/devices`,
                        {
                            end_device,
                            field_mask: { paths: field_mask_paths.identity_server }
                        }
                    )
                    .then( response => resolve(response.data) )
                    .catch( err => reject(generate_error(err, 'identity_server')) )
                })
            }
            function create_in_network_server(end_device: EndDevice) {
                return new Promise<any>((resolve, reject) => {
                    network_server.post(
                        `/applications/${end_device.ids.application_ids.application_id}/devices`, 
                        {
                            end_device,
                            field_mask: { paths: field_mask_paths.network_server }
                        }
                    )
                    .then( response => resolve(response.data) )
                    .catch( err => reject(generate_error(err, 'network_server')) )
                })
            }
            function create_in_application_server(end_device: EndDevice) {
                return new Promise<any>((resolve, reject) => {
                    application_server.post(
                        `/applications/${end_device.ids.application_ids.application_id}/devices`, 
                        {
                            end_device,
                            field_mask: { paths: field_mask_paths.application_server }
                        }
                    )
                    .then( response => resolve(response.data) )
                    .catch( err => reject(generate_error(err, 'application_server')) )
                })
            }
            function create_in_join_server(end_device: EndDevice) {
                return new Promise<any>((resolve, reject) => {
                    join_server.post(
                        `/applications/${end_device.ids.application_ids.application_id}/devices`, 
                        {
                            end_device,
                            field_mask: { paths: field_mask_paths.join_server }
                        }
                    )
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
                .then( () => {
                    ttn.devices.get(end_device.ids.application_ids.application_id, end_device.ids.device_id, true)
                    .then( device => resolve(device) )
                    .catch( err => reject(err) )
                })
                .catch( err => reject(err) )
            })
        },
        delete: (application_id: string, device_id: string) => {
            function delete_in_identity_server(application_id: string, device_id: string) {
                return new Promise<any>((resolve, reject) => {
                    identity_server.delete(
                        `/applications/${application_id}/devices/${device_id}`
                    )
                    .then( response => resolve(response.data) )
                    .catch( err => reject(generate_error(err, 'identity_server')) )
                })
            }
            function delete_in_join_server(application_id: string, device_id: string) {
                return new Promise<any>((resolve, reject) => {
                    join_server.delete(
                        `/applications/${application_id}/devices/${device_id}`
                    )
                    .then( response => resolve(response.data) )
                    .catch( err => reject(generate_error(err, 'join_server')) )
                })
            }
            function delete_in_application_server(application_id: string, device_id: string) {
                return new Promise<any>((resolve, reject) => {
                    application_server.delete(
                        `/applications/${application_id}/devices/${device_id}`
                    )
                    .then( response => resolve(response.data) )
                    .catch( err => reject(generate_error(err, 'application_server')) )
                })
            }
            function delete_in_network_server(application_id: string, device_id: string) {
                return new Promise<any>((resolve, reject) => {
                    network_server.delete(
                        `/applications/${application_id}/devices/${device_id}`
                    )
                    .then( response => resolve(response.data) )
                    .catch( err => reject(generate_error(err, 'network_server')) )
                })
            }

            return new Promise<any>(async (resolve, reject) => {
                Promise.all([
                    delete_in_network_server(application_id, device_id),
                    delete_in_application_server(application_id, device_id),
                    delete_in_join_server(application_id, device_id),
                    delete_in_identity_server(application_id, device_id)
                ])
                .then( () => resolve({success: true}) )
                .catch( err => reject(err) )
            })
        }
    }
}

export default ttn