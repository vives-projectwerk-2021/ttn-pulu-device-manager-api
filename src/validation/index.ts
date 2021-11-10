import properties from "./properties"

const schemas = {
    devices: {
        update: {
            "type": "object",
            "properties": {
                "name": properties.name,
                "description": properties.description
            },
            "anyOf": [
                { "required": ["name"] },
                { "required": ["description"] },
                { "required": ["name", "description"] },
            ],
            "additionalProperties": false
        },
        create: {
            "type": "object",
            "properties": {
                "device_id": properties.device_id,
                "name": properties.name,
                "dev_eui": properties.dev_eui,
                "app_eui":properties.app_eui,
                "app_key": properties.app_key,
                "description": properties.description
            },
            "required": [
                "device_id",
                "name",
                "dev_eui",
                "app_eui",
                "app_key"
            ],
            "additionalProperties": false
        }
    }
}

export default { schemas, properties }