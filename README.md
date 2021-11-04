# TTN pulu device manager API

This is an API to manage the registered pulu-devices on The Things Network.

## .env file

- `Port`
  - You can specify the port on which the API will listen (default 3000).
- `TTN_API_KEY`
  - Enter the API_KEY from TTN

## Endpoints

### GET /devices

Get information about all registered pulu-devices

### GET /devices/:device_id

Get information about a specific pulu-device

### POST /devices

Register a new pulu-device to The Things Network

- required JSON properties:
  - device_id
  - name
  - dev_eui
  - app_eui
  - app_key
- optional JSON properties:
  - description

### DELETE /devices/:device_id

Unregister a pulu-device from The Things Network
