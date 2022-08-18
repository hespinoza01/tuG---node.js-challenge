import { RoomTypeService } from '../services'
import { RoomTypeValidator } from '../validators'
import { ApiResponse } from '../utils'
import { AuthMiddleware } from '../middlewares'

const RoomTypeController = {}

RoomTypeController.create = [
    AuthMiddleware,
    function (req, res) {
        RoomTypeValidator.create(req.body)
            .then(data => RoomTypeService.create(data))
            .then(result => res.done(ApiResponse.success(result)))
            .catch(error => res.done(ApiResponse.badRequest(error)))
    },
]

RoomTypeController.detail = function (req, res) {
    RoomTypeValidator.check(req.params, ['id'])
        .then(({ id }) => RoomTypeService.get(id))
        .then(result => res.done(ApiResponse.success(result)))
        .catch(error => res.done(ApiResponse.badRequest(error)))
}

RoomTypeController.update = [
    AuthMiddleware,
    function (req, res) {
        RoomTypeValidator.update({ ...req.body, id: req.params.id })
            .then(data => RoomTypeService.update(data))
            .then(result => res.done(ApiResponse.success(result)))
            .catch(error => res.done(ApiResponse.badRequest(error)))
    },
]

RoomTypeController.list = function (_, res) {
    RoomTypeService.list()
        .then(result => res.done(ApiResponse.success(result)))
        .catch(error => res.done(ApiResponse.badRequest(error)))
}

export default Object.freeze(RoomTypeController)
