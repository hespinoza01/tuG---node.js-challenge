import { PaymentModel, PaymentTypeModel } from '../models'
import ReservationService from './reservation.service'

const PaymentService = {}

/**
 * Create a new payment
 * @param {Object} data
 * @param {Number} data.reservationId
 * @param {Number} data.paymentType
 * @returns {Promise<Object>}
 */
PaymentService.create = function ({
    reservationId: ReservationId,
    paymentType: PaymentTypeId,
}) {
    return new Promise(async (resolve, reject) => {
        try {
            const payment = await PaymentModel.create({
                amount: await ReservationService.getReservationAmount(
                    ReservationId
                ),
                ReservationId,
                PaymentTypeId,
            })

            resolve(payment.get({ plain: true }))
        } catch (error) {
            reject(`PaymentService.create: ${error}`)
        }
    })
}

/**
 * Update a existing payment
 * @param {Object} data
 * @param {Number} data.id
 * @param {Number} data.amount
 * @param {Number} data.reservationId
 * @param {Number} data.paymentType
 * @returns {Promise<Boolean>}
 */
PaymentService.update = function ({
    id,
    amount,
    reservationId: ReservationId,
    paymentType: PaymentTypeId,
}) {
    return new Promise(async (resolve, reject) => {
        try {
            const payment = await PaymentModel.findByPk(id)

            if (!payment) {
                throw String('payment not found')
            }

            await payment.update({
                amount,
                ReservationId,
                PaymentTypeId,
            })

            resolve(true)
        } catch (error) {
            reject(`PaymentService.update: ${error}`)
        }
    })
}

/**
 * Get payment detail by id
 * @param {Number} id
 * @returns {Promise<Object>}
 */
PaymentService.get = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            const payment = await PaymentModel.findByPk(id)

            if (!payment) {
                throw String('payment not found')
            }

            resolve(payment.get({ plain: true }))
        } catch (error) {
            reject(`PaymentService.get: ${error}`)
        }
    })
}

/**
 * List all available payments
 * @returns {Promise<Array>}
 */
PaymentService.list = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const payments = await PaymentModel.findAll({
                raw: true,
                order: [['id', 'DESC']],
            })

            resolve(payments)
        } catch (error) {
            reject(`PaymentService.list: ${error}`)
        }
    })
}

PaymentService.listPaymentTypes = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const payments = await PaymentTypeModel.findAll({
                raw: true,
                order: [['id', 'DESC']],
            })

            resolve(payments)
        } catch (error) {
            reject(`PaymentService.listPaymentTypes: ${error}`)
        }
    })
}

export default Object.freeze(PaymentService)
