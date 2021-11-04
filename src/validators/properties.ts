export default {
    device_id: {
        "device_id": {
            "type": "string",
            "pattern": "^[a-z0-9](?:[-]?[a-z0-9]){2,35}$"
        }
    },
    name: {
        "name": {
            "type": "string",
            "pattern": "^[a-zA-Z0-9 _\-]{0,50}$"
        }
    },
    dev_eui: {
        "dev_eui": {
            "type": "string",
            "pattern": "^[A-F0-9]{16}"
        }
    },
    app_eui: {
        "app_eui": {
            "type": "string",
            "pattern": "^[A-F0-9]{16}"
        }
    },
    app_key: {
        "app_key": {
            "type": "string",
            "pattern": "^[A-F0-9]{32}"
        }
    },
    description: {
        "description": {
            "type": "string",
            "pattern": "^[a-zA-Z0-9 _\-]{0,2000}$"
        }
    }
}