import Joi from 'joi'
import GeneralValidator from './general.validator'

const ReservationValidator = {}
const Validators = {
    id: Joi.number().exist().positive().messages({
        'number.base': 'id is required',
        'any.required': 'id is required',
        'number.positive': 'id must be a positive number',
    }),

    days: Joi.number().exist().positive().messages({
        'number.base': 'days is required',
        'any.required': 'days is required',
        'number.positive': 'days must be a positive number',
    }),

    userId: Joi.number().exist().positive().messages({
        'number.base': 'userId is required',
        'any.required': 'userId is required',
        'number.positive': 'userId must be a positive number',
    }),

    personId: Joi.number().exist().positive().messages({
        'number.base': 'personId is required',
        'any.required': 'personId is required',
        'number.positive': 'personId must be a positive number',
    }),

    roomId: Joi.number().exist().positive().messages({
        'number.base': 'roomId is required',
        'any.required': 'roomId is required',
        'number.positive': 'roomId must be a positive number',
    }),

    status: Joi.number().exist().positive().messages({
        'number.base': 'status is required',
        'any.required': 'status is required',
        'number.positive': 'status must be a positive number',
    }),
}

/**
 * Check specific attributes constraints from reservation
 * @param {Object} data
 * @param {Array} attributes
 * @returns {Promise<Object>}
 */
ReservationValidator.check = function (data, attributes = []) {
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
            reject(`ReservationValidator.check: ${error}`)
        }
    })
}

ReservationValidator.create = function (data) {
    return ReservationValidator.check(data, [
        'days',
        'userId',
        'personId',
        'roomId',
        'status',
    ])
}

ReservationValidator.update = function (data) {
    return ReservationValidator.check(data, [
        'id',
        'days',
        'userId',
        'personId',
        'roomId',
        'status',
    ])
}

export default Object.freeze(ReservationValidator)
