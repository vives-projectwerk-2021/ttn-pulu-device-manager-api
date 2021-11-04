import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import config from './config'

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

app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`)
})