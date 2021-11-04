import { EndDevice } from '../ttn/'

interface EndDevice_props {
    device_id: string,
    name: string,
    description?: string,
    dev_eui: string,
    join_eui: string,
    app_key: string
}

function ttn_end_device(props: EndDevice_props): EndDevice {
    props.description = props.description || `'${props.name}' created by pulu API`
    return {
        ids: {
            device_id: props.device_id,
            dev_eui: props.dev_eui,
            join_eui: props.join_eui,
            application_ids: { application_id: 'pulu' }
        },
        name: props.name,
        description: props.description,
        root_keys: { app_key: { key: props.app_key } },
        network_server_address: "eu1.cloud.thethings.network",
        application_server_address: "eu1.cloud.thethings.network",
        join_server_address: "eu1.cloud.thethings.network",
        lorawan_version: "1.0.2",
        lorawan_phy_version: "1.0.2",
        frequency_plan_id: "EU_863_870_TTN",
        supports_join: true
    }
}

export { EndDevice_props, ttn_end_device }