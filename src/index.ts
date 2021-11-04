import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import config from './config'
import pulu from './pulu'
import { validate } from 'jsonschema'
import validation from './validation'
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
    if(req.params.id.match(validation.properties.device_id.pattern))
    {
        pulu.devices.get(req.params.id)
        .then(device => res.json(device))
        .catch(err => res.status(500).send(err))
    }
    else {
        res.status(400).send({
            message: 'Validation failed!',
            details: `${req.params.id} doesn't match the required pattern`
        })
    }
})

app.post('/devices', async (req: Request, res: Response) => {
    const body_validation = validate(req.body, validation.schemas.devices.create)
    if(!body_validation.valid) {
        res.status(400).send({
            message: 'Validation failed!',
            details: body_validation.errors.map(e => e.stack)
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
    if(req.params.id.match(validation.properties.device_id.pattern))
    {
        pulu.devices.delete(req.params.id)
        .then(status => res.json(status))
        .catch(err => res.status(500).send(err))
    }
    else {
        res.status(400).send({
            message: 'Validation failed!',
            details: `${req.params.id} doesn't match the required pattern`
        })
    }
})

app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`)
})