const ids = [
    "ids.device_id",
    "ids.dev_eui",
    "ids.join_eui",
]

const field_mask_paths = {
    identity_server: [
        ...ids,
        "name",
        "description",
        "join_server_address",
        "network_server_address",
        "application_server_address"
    ],
    join_server: [
        ...ids,
        "network_server_address",
        "application_server_address",
        "root_keys.app_key.key"
    ],
    network_server: [
        ...ids,
        "frequency_plan_id",
        "lorawan_phy_version",
        "lorawan_version",
        "supports_join"
    ], 
    application_server: [
        ...ids
    ]
}

export { field_mask_paths }