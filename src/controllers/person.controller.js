import { PersonService } from '../services'
import { PersonValidator } from '../validators'
import { ApiResponse } from '../utils'
import { AuthMiddleware } from '../middlewares'

const PersonController = {}

/**
 * Action to create a new person
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {undefined}
 */
PersonController.create = [
    AuthMiddleware,
    function (req, res) {
        PersonValidator.create(req.body)
            .then(data => PersonService.create(data))
            .then(result => res.done(ApiResponse.success(result)))
            .catch(error => res.done(ApiResponse.badRequest(error)))
    },
]

/**
 * Action to get person detail by id
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {undefined}
 */
PersonController.detail = [
    AuthMiddleware,
    function (req, res) {
        PersonValidator.check(req.params, ['id'])
            .then(({ id }) => PersonService.get(id))
            .then(result => res.done(ApiResponse.success(result)))
            .catch(error => res.done(ApiResponse.badRequest(error)))
    },
]

/**
 * Action to update already registered person
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {undefined}
 */
PersonController.update = [
    AuthMiddleware,
    function (req, res) {
        PersonValidator.update({ ...req.body, id: req.params.id })
            .then(data => PersonService.update(data))
            .then(result => res.done(ApiResponse.success(result)))
            .catch(error => res.done(ApiResponse.badRequest(error)))
    },
]

/**
 * Action to list all registered persons
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {undefined}
 */
PersonController.list = [
    AuthMiddleware,
    function (_, res) {
        PersonService.list()
            .then(result => res.done(ApiResponse.success(result)))
            .catch(error => res.done(ApiResponse.badRequest(error)))
    },
]

export default Object.freeze(PersonController)
