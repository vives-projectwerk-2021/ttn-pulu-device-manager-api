import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import config from './config'
import ttn from './ttn'

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
    ttn.devices.list('pulu')
    .then(devices => res.json(devices))
    .catch(err => res.status(500).send(err))
})

app.get('/devices/:id', async (req: Request, res: Response) => {
    ttn.devices.get('pulu', req.params.id)
    .then(device => res.json(device))
    .catch(err => res.status(500).send(err))
})

app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`)
})