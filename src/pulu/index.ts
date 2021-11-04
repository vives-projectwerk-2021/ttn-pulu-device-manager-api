import { EndDevice_props, ttn_end_device } from './endDevice'
import ttn from "../ttn";

const pulu = {
    devices: {
        list: () => {
            return ttn.devices.list('pulu')
        },
        get: (device_id: string) => {
            return ttn.devices.get('pulu', device_id)
        },
        create: (props: EndDevice_props) => {
            const end_device = ttn_end_device(props)
            return ttn.devices.create(end_device)
        },
    }
}

export default pulu