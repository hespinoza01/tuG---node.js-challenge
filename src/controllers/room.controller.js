import { RoomService } from '../services'
import { RoomValidator } from '../validators'
import { ApiResponse } from '../utils'
import { AuthMiddleware } from '../middlewares'

const RoomController = {}

RoomController.create = [
    AuthMiddleware,
    function (req, res) {
        RoomValidator.create(req.body)
            .then(data => RoomService.create(data))
            .then(result => res.done(ApiResponse.success(result)))
            .catch(error => res.done(ApiResponse.badRequest(error)))
    },
]

RoomController.detail = function (req, res) {
    RoomValidator.check(req.params, ['id'])
        .then(({ id }) => RoomService.get(id))
        .then(result => res.done(ApiResponse.success(result)))
        .catch(error => res.done(ApiResponse.badRequest(error)))
}

RoomController.update = [
    AuthMiddleware,
    function (req, res) {
        RoomValidator.update({ ...req.body, id: req.params.id })
            .then(data => RoomService.update(data))
            .then(result => res.done(ApiResponse.success(result)))
            .catch(error => res.done(ApiResponse.badRequest(error)))
    },
]

RoomController.list = function (_, res) {
    RoomService.list()
        .then(result => res.done(ApiResponse.success(result)))
        .catch(error => res.done(ApiResponse.badRequest(error)))
}

export default Object.freeze(RoomController)
