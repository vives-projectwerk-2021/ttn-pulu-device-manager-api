import base64 from "../base64"

function generate_keys_from_device_id(id: string) {
    const prefix = base64.decode_bytes('devbit')
    const encoded_id = base64.encode_bytes(id)
    const keys = prefix + base64.decode_bytes(
            encoded_id.slice(0,5)
        +   id.slice(0,12)
        +   encoded_id.slice(6,10)
        +   id.slice(12,24)
        +   encoded_id.slice(11,16)
    )
    return {
        dev_eui: keys.slice(0,16),
        app_eui: keys.slice(16,32),
        app_key: keys.slice(32,64)
    }
}

export {generate_keys_from_device_id}