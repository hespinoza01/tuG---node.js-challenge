import Joi from 'joi'
import GeneralValidator from './general.validator'

const RoomValidator = {}
const Validators = {
    id: Joi.number().exist().positive().messages({
        'number.base': 'id is required',
        'any.required': 'id is required',
        'number.positive': 'id must be a positive number',
    }),

    roomTypeId: Joi.number().exist().positive().messages({
        'number.base': 'RoomTypeId is required',
        'any.required': 'RoomTypeId is required',
        'number.positive': 'RoomTypeId must be a positive number',
    }),

    enabled: Joi.boolean().exist().messages({
        'boolean.base': 'enabled must be a boolean',
        'any.required': 'enabled is required',
    }),
}

/**
 * Check specific attributes constraints from room data
 * @param {Object} data
 * @param {Array} attributes
 * @returns {Promise<Object>}
 */
RoomValidator.check = function (data, attributes = []) {
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
            reject(`RoomValidator.check: ${error}`)
        }
    })
}

RoomValidator.create = function (data) {
    return RoomValidator.check(data, ['enabled', 'roomTypeId'])
}

RoomValidator.update = function (data) {
    return RoomValidator.check(data, ['id', 'enabled', 'roomTypeId'])
}

export default Object.freeze(RoomValidator)
