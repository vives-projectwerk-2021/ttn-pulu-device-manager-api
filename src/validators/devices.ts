import properties from "./properties"

const DeviceSchema = {
    create: {
        "type": "object",
        "properties": {
            ...properties.device_id,
            ...properties.name,
            ...properties.dev_eui,
            ...properties.app_eui,
            ...properties.app_key,
            ...properties.description
        },
        "required": [
            "device_id",
            "name",
            "dev_eui",
            "app_eui",
            "app_key"
        ],
        "additionalProperties": [
            "description"
        ]
    }
}

export { DeviceSchema }