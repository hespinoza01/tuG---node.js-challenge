import { AuthService } from '../services'
import { ApiResponse } from '../utils'

export default async (req, res, next) => {
    try {
        const authHeader =
            req.headers.authorization || req.headers.Authorization
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            throw String('auth token not found')
        }

        const decode = await AuthService.checkAuthToken(token)

        req.auth = decode
        next()
    } catch (error) {
        res.done(ApiResponse.notAuthenticated(`AuthMiddleware: ${error}`))
    }
}
