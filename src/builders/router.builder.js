import express from 'express'
import { ResponseMiddleware } from '../middlewares'
import { GeneralValidator } from '../validators'

export default class RouterBuilder {
    constructor() {
        this._router = express.Router()
        this._allowedMethods = Object.freeze([
            'get',
            'post',
            'delete',
            'patch',
            'put',
        ])
    }

    addRoute(route, methods) {
        if (!GeneralValidator(route).isString()) {
            throw String('Route must be a string')
        }

        if (!GeneralValidator(methods).isObject()) {
            throw String('Methods must be an object')
        }

        for (let method of this._allowedMethods) {
            const controller = methods[method] || ResponseMiddleware.notAllowed

            this._router[method](route, controller)
        }

        return this
    }

    addMiddleware(controller) {
        this._router.use(controller)

        return this
    }

    build() {
        return this._router
    }
}
