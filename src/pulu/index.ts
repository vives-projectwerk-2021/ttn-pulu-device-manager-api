import ttn from "../ttn";

const pulu = {
    devices: {
        list: () => {
            return ttn.devices.list('pulu')
        },
        get: (device_id: string) => {
            return ttn.devices.get('pulu', device_id)
        },
    }
}

export default pulu