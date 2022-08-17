import { ApiResponse, RequestResponse } from '../utils'

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.Next} next
 */
function responseMiddleware(req, res, next) {
    req.body = {
        ...req.body,
        ...req.query,
    }

    /**
     * Custom express response resolver
     * @param {ApiResponse} _res
     */
    res.done = _res => {
        const apiResponse =
            _res instanceof ApiResponse
                ? _res
                : ApiResponse.internal('Invalid Response Object')

        const result = new RequestResponse(apiResponse, req)

        res.status(result.code).json(result.body)
    }

    next()
}

responseMiddleware.notAllowed = (_, res) => {
    res.done(ApiResponse.notAllowed('Method Not Allowed'))
}

responseMiddleware.notFound = (_, res) => {
    res.done(ApiResponse.notAllowed('Request Route Not Found'))
}

export default responseMiddleware
