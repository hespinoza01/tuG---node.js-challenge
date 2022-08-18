import { PaymentService } from '../services'
import { PaymentValidator } from '../validators'
import { ApiResponse } from '../utils'
import { AuthMiddleware } from '../middlewares'

const PaymentController = {}

PaymentController.create = [
    AuthMiddleware,
    function (req, res) {
        PaymentValidator.create(req.body)
            .then(data => PaymentService.create(data))
            .then(result => res.done(ApiResponse.success(result)))
            .catch(error => res.done(ApiResponse.badRequest(error)))
    },
]

PaymentController.detail = function (req, res) {
    PaymentValidator.check(req.params, ['id'])
        .then(({ id }) => PaymentService.get(id))
        .then(result => res.done(ApiResponse.success(result)))
        .catch(error => res.done(ApiResponse.badRequest(error)))
}

PaymentController.update = [
    AuthMiddleware,
    function (req, res) {
        PaymentValidator.update({
            ...req.body,
            id: req.params.id,
        })
            .then(data => PaymentService.update(data))
            .then(result => res.done(ApiResponse.success(result)))
            .catch(error => res.done(ApiResponse.badRequest(error)))
    },
]

PaymentController.list = function (_, res) {
    PaymentService.list()
        .then(result => res.done(ApiResponse.success(result)))
        .catch(error => res.done(ApiResponse.badRequest(error)))
}

PaymentController.listPaymentTypes = function (_, res) {
    PaymentService.listPaymentTypes()
        .then(result => res.done(ApiResponse.success(result)))
        .catch(error => res.done(ApiResponse.badRequest(error)))
}

export default Object.freeze(PaymentController)
