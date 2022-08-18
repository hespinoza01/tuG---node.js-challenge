import Joi from 'joi'
import GeneralValidator from './general.validator'

const UserValidator = {}
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

    password: Joi.string().exist().trim().min(6).messages({
        'string.min': 'password is too short',
        'any.required': 'password is required',
    }),
}

/**
 * Check specific attributes constraints from user data
 * @param {Object} data
 * @param {Array} attributes
 * @returns {Promise<Object>}
 */
UserValidator.check = function (data, attributes = []) {
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
            reject(`UserValidator.check: ${error}`)
        }
    })
}

UserValidator.create = function (data) {
    return UserValidator.check(data, ['fullname', 'email', 'password'])
}

UserValidator.update = function (data) {
    return UserValidator.check(data, ['id', 'fullname', 'email', 'password'])
}

UserValidator.login = function (data) {
    return UserValidator.check(data, ['email', 'password'])
}

export default Object.freeze(UserValidator)
