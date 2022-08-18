import { UserService } from '../services'
import { UserValidator } from '../validators'
import { ApiResponse } from '../utils'
import { AuthMiddleware } from '../middlewares'

const UserController = {}

/**
 * Action to create a new admin user using fullname, email & password
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {undefined}
 */
UserController.create = function (req, res) {
    UserValidator.create(req.body)
        .then(data => UserService.create(data))
        .then(result => res.done(ApiResponse.success(result)))
        .catch(error => res.done(ApiResponse.badRequest(error)))
}

/**
 * Action to get user detail by id
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {undefined}
 */
UserController.detail = [
    AuthMiddleware,
    function (req, res) {
        UserValidator.check(req.params, ['id'])
            .then(({ id }) => UserService.get(id))
            .then(result => res.done(ApiResponse.success(result)))
            .catch(error => res.done(ApiResponse.badRequest(error)))
    },
]

/**
 * Action to update fullname, email & password for already registered user
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {undefined}
 */
UserController.update = [
    AuthMiddleware,
    function (req, res) {
        UserValidator.update({ ...req.body, id: req.auth.id })
            .then(data => UserService.update(data))
            .then(result => res.done(ApiResponse.success(result)))
            .catch(error => res.done(ApiResponse.badRequest(error)))
    },
]

/**
 * Action to list all registered admin users
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {undefined}
 */
UserController.list = [
    AuthMiddleware,
    function (_, res) {
        UserService.list()
            .then(result => res.done(ApiResponse.success(result)))
            .catch(error => res.done(ApiResponse.badRequest(error)))
    },
]

/**
 * Action to admin user login
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {undefined}
 */
UserController.login = function (req, res) {
    UserValidator.login(req.body)
        .then(data => UserService.login(data))
        .then(result => res.done(ApiResponse.success(result)))
        .catch(error => res.done(ApiResponse.badRequest(error)))
}

export default UserController
