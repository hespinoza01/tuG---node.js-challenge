import Joi from 'joi'
import GeneralValidator from './general.validator'

const RoomTypeValidator = {}
const Validators = {
    id: Joi.number().exist().positive().messages({
        'number.base': 'id is required',
        'any.required': 'id is required',
        'number.positive': 'id must be a positive number',
    }),

    name: Joi.string().exist().trim().min(4).max(155).messages({
        'string.base': 'name must be a string',
        'any.required': 'name is required',
        'string.min': 'name must behave at least 4 characters',
        'string.max': "name mustn't behave at least 155 characters",
    }),

    price: Joi.number().exist().positive().messages({
        'number.base': 'price is required',
        'any.required': 'price is required',
        'number.positive': 'price must be a positive number',
    }),

    bedsQuantity: Joi.number().exist().positive().messages({
        'number.base': 'bedsQuantity is required',
        'any.required': 'bedsQuantity is required',
        'number.positive': 'bedsQuantity must be a positive number',
    }),

    hasTv: Joi.boolean().exist().messages({
        'boolean.base': 'hasTv must be a boolean',
        'any.required': 'hastTv is required',
    }),

    hasJacuzzi: Joi.boolean().exist().messages({
        'boolean.base': 'hasJacuzzi must be a boolean',
        'any.required': 'hasJacuzzi is required',
    }),

    hasAirConditioning: Joi.boolean().exist().messages({
        'boolean.base': 'hasAirConditioning must be a boolean',
        'any.required': 'hasAirConditioning is required',
    }),
}

/**
 * Check specific attributes constraints from room type data
 * @param {Object} data
 * @param {Array} attributes
 * @returns {Promise<Object>}
 */
RoomTypeValidator.check = function (data, attributes = []) {
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
            reject(`RoomTypeValidator.check: ${error}`)
        }
    })
}

RoomTypeValidator.create = function (data) {
    return RoomTypeValidator.check(data, [
        'name',
        'price',
        'bedsQuantity',
        'hasTv',
        'hasJacuzzi',
        'hasAirConditioning',
    ])
}

RoomTypeValidator.update = function (data) {
    return RoomTypeValidator.check(data, [
        'id',
        'name',
        'price',
        'bedsQuantity',
        'hasTv',
        'hasJacuzzi',
        'hasAirConditioning',
    ])
}

export default Object.freeze(RoomTypeValidator)
