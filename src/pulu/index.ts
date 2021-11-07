import { EndDevice_props, ttn_end_device } from './endDevice'
import ttn from "../ttn";

const pulu = {
    devices: {
        list: () => {
            return ttn.devices.list('pulu')
        },
        get: (device_id: string, with_app_key: boolean = false) => {
            return ttn.devices.get('pulu', device_id, with_app_key)
        },
        create: (props: EndDevice_props) => {
            const end_device = ttn_end_device(props)
            return ttn.devices.create(end_device)
        },
        delete: (device_id: string) => {
            return ttn.devices.delete('pulu', device_id)
        }
    }
}

export default pulu