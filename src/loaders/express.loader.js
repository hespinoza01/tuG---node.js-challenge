import { json, urlencoded } from 'express'
import cors from 'cors'
import useragent from 'express-useragent'
import helmet from 'helmet'
import { ResponseMiddleware } from '../middlewares'

export default async (app, routes = []) => {
    if (!app || !Array.isArray(routes)) {
        return
    }

    app.set('trust proxy')
    app.disable('x-powered-by')

    app.use(cors({ origin: '*' }))

    app.use(json())
    app.use(urlencoded({ extended: true }))

    app.use(useragent.express())
    app.use(helmet())
    app.use(ResponseMiddleware)

    app.get('/', async (_, res) => {
        res.send('connected')
    })

    // define app routes
    for (const route of routes) {
        const { path = null, controller = null } = route

        if (path && controller) {
            app.use(path, controller)
        }
    }

    app.use('/*', ResponseMiddleware.notFound)

    return app
}
