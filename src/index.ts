import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import config from './config'
import pulu from './pulu'
import { validate } from 'jsonschema'
import { DeviceSchema } from './validators/devices'
import { EndDevice_props } from './pulu/endDevice'

const app: Express = express()
// use nice middleware logging for requests
app.use(morgan('combined'))
// enable application/json parsing
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'ttn pulu device manager',
        version: `v${process.env.npm_package_version}`
    })
})

app.get('/devices', (req: Request, res: Response) => {
    pulu.devices.list()
    .then(devices => res.json(devices))
    .catch(err => res.status(500).send(err))
})

app.get('/devices/:id', async (req: Request, res: Response) => {
    pulu.devices.get(req.params.id)
    .then(device => res.json(device))
    .catch(err => res.status(500).send(err))
})

app.post('/devices', async (req: Request, res: Response) => {
    const validation = validate(req.body, DeviceSchema.create)
    if(!validation.valid) {
        res.status(400).send({
            message: 'Validation failed!',
            details: validation.errors.map(e => e.stack)
        })
    }
    else {
        const props: EndDevice_props = {
            device_id: req.body.device_id,
            name: req.body.name,
            description: req.body.description,
            dev_eui: req.body.dev_eui,
            join_eui: req.body.app_eui,
            app_key: req.body.app_key
        }
        pulu.devices.create(props)
        .then(device => res.status(201).json(device))
        .catch(err => res.status(500).send(err))
    }
})

app.delete('/devices/:id', async (req: Request, res: Response) => {
    pulu.devices.delete(req.params.id)
    .then(status => res.json(status))
    .catch(err => res.status(500).send(err))
})

app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`)
})