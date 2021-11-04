import dotenv from 'dotenv'
dotenv.config()

const config = {
    server: {
        port:   process.env.PORT || 3000
    },
    ttn: {
        api_key: process.env.TTN_API_KEY
    }
}

export default config