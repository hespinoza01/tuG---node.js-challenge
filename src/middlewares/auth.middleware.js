import { ApiResponse } from '../utils'
import { AuthToken } from '../utils'

export default async (req, res, next) => {
    try {
        const authHeader =
            req.headers.authorization || req.headers.Authorization
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            throw String('auth token not found')
        }

        const decode = await AuthToken.decode(token)

        req.auth = decode
        next()
    } catch (error) {
        res.done(ApiResponse.notAuthenticated(`AuthMiddleware: ${error}`))
    }
}
