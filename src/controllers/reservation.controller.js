import { ReservationService } from '../services'
import { ReservationValidator } from '../validators'
import { ApiResponse } from '../utils'
import { AuthMiddleware } from '../middlewares'

const ReservationController = {}

ReservationController.create = [
    AuthMiddleware,
    function (req, res) {
        ReservationValidator.create({ ...req.body, userId: req.auth.id })
            .then(data => ReservationService.create(data))
            .then(result => res.done(ApiResponse.success(result)))
            .catch(error => res.done(ApiResponse.badRequest(error)))
    },
]

ReservationController.detail = function (req, res) {
    ReservationValidator.check(req.params, ['id'])
        .then(({ id }) => ReservationService.get(id))
        .then(result => res.done(ApiResponse.success(result)))
        .catch(error => res.done(ApiResponse.badRequest(error)))
}

ReservationController.update = [
    AuthMiddleware,
    function (req, res) {
        ReservationValidator.update({
            ...req.body,
            userId: req.auth.id,
            id: req.params.id,
        })
            .then(data => ReservationService.update(data))
            .then(result => res.done(ApiResponse.success(result)))
            .catch(error => res.done(ApiResponse.badRequest(error)))
    },
]

ReservationController.list = function (_, res) {
    ReservationService.list()
        .then(result => res.done(ApiResponse.success(result)))
        .catch(error => res.done(ApiResponse.badRequest(error)))
}

export default Object.freeze(ReservationController)
