import Joi from 'joi'
import GeneralValidator from './general.validator'

const PersonValidator = {}
const Validators = {
    id: Joi.number().exist().positive().messages({
        'number.base': 'id is required',
        'any.required': 'id is required',
        'number.positive': 'id must be a positive number',
    }),

    email: Joi.string()
        .exist()
        .trim()
        .lowercase()
        .max(100)
        .email({ tlds: { allow: false } })
        .messages({
            'string.base': 'email must be a string',
            'string.max': "email mustn't behave at least 100 characters",
            'string.email': 'email must behave a valid address',
            'string.empty': 'email is required',
            'any.required': 'email is required',
        }),

    fullname: Joi.string().exist().trim().min(4).max(155).messages({
        'string.base': 'fullname must be a string',
        'any.required': 'fullname is required',
        'string.min': 'fullname must behave at least 4 characters',
        'string.max': "fullname mustn't behave at least 155 characters",
    }),

    telephone: Joi.string().exist().trim().min(6).messages({
        'string.base': 'telephone must be a string',
        'any.required': 'telephone is required',
        'string.empty': 'telephone is required',
        'string.min': 'telephone must behave at least 6 characters',
    }),

    dni: Joi.string().exist().trim().min(6).messages({
        'string.base': 'dni must be a string',
        'any.required': 'dni is required',
        'string.empty': 'dni is required',
        'string.min': 'dni must behave at least 6 characters',
    }),

    direction: Joi.string().exist().trim().min(4).max(255).messages({
        'string.base': 'direction must be a string',
        'any.required': 'direction is required',
        'string.min': 'direction must behave at least 4 characters',
        'string.max': "direction mustn't behave at least 255 characters",
    }),
}

/**
 * Check specific attributes constraints from person data
 * @param {Object} data
 * @param {Array} attributes
 * @returns {Promise<Object>}
 */
PersonValidator.check = function (data, attributes = []) {
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
            reject(`PersonValidator.check: ${error}`)
        }
    })
}

PersonValidator.create = function (data) {
    return PersonValidator.check(data, [
        'fullname',
        'email',
        'dni',
        'telephone',
        'direction',
    ])
}

PersonValidator.update = function (data) {
    return PersonValidator.check(data, [
        'id',
        'fullname',
        'email',
        'dni',
        'telephone',
        'direction',
    ])
}

export default Object.freeze(PersonValidator)
