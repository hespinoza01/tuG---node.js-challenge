import loader from './loaders'
import express from 'express'
import { constants, db } from './config'
import { api } from './api'
import logger from './logger'

async function startServer() {
    const app = express()

    loader
        .init({
            expressApp: app,
            expressRoutes: api(),
            sequelizeInstance: db,
        })
        .then(() => {
            app.listen(constants.SERVER_PORT, err => {
                if (err) {
                    console.log(err)
                    return
                }

                logger.info(
                    `🚀 Server running at port: ${constants.SERVER_PORT}`
                )
            })
        })
        .catch(error => {
            console.log(error)
            process.exit(1)
        })
}

startServer()
