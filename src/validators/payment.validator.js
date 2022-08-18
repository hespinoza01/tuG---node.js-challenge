import Joi from 'joi'
import GeneralValidator from './general.validator'

const PaymentValidator = {}
const Validators = {
    id: Joi.number().exist().positive().messages({
        'number.base': 'id is required',
        'any.required': 'id is required',
        'number.positive': 'id must be a positive number',
    }),

    amount: Joi.number().exist().positive().messages({
        'number.base': 'amount is required',
        'any.required': 'amount is required',
        'number.positive': 'amount must be a positive number',
    }),

    reservationId: Joi.number().exist().positive().messages({
        'number.base': 'reservationId is required',
        'any.required': 'reservationId is required',
        'number.positive': 'reservationId must be a positive number',
    }),

    paymentType: Joi.number().exist().positive().messages({
        'number.base': 'paymentType is required',
        'any.required': 'paymentType is required',
        'number.positive': 'paymentType must be a positive number',
    }),
}

/**
 * Check specific attributes constraints from payment
 * @param {Object} data
 * @param {Array} attributes
 * @returns {Promise<Object>}
 */
PaymentValidator.check = function (data, attributes = []) {
    return new Promise((resolve, reject) => {
        try {
            if (!GeneralValidator(data).isObject()) {
                throw String('Data must be an object')
            }

            if (!GeneralValidator(attributes).isArray()) {
                throw new String('Attributes must be an Array')
            }

            // extract required validators
            const validators = Object.entries(Validators).filter(
                ([key]) => attributes.indexOf(key) != -1
            )

            const schema = Joi.object(Object.fromEntries(validators))
            const result = GeneralValidator(data).validateJoiSchema(schema)

            resolve(result)
        } catch (error) {
            reject(`PaymentValidator.check: ${error}`)
        }
    })
}

PaymentValidator.create = function (data) {
    return PaymentValidator.check(data, [
        // 'amount',
        'reservationId',
        'paymentType',
    ])
}

PaymentValidator.update = function (data) {
    return PaymentValidator.check(data, [
        'id',
        // 'amount',
        'reservationId',
        'paymentType',
    ])
}

export default Object.freeze(PaymentValidator)
