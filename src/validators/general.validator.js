import { ValidationErrorMessage } from '../utils'

class GeneralValidator {
    constructor(value) {
        this.value = value
    }

    /**
     * Check if value is an Object
     * @returns {boolean}
     */
    isObject() {
        return Object.prototype.toString.call(this.value) === '[object Object]'
    }

    /**
     * Check if value is an Array
     * @returns {boolean}
     */
    isArray() {
        return Object.prototype.toString.call(this.value) === '[object Array]'
    }

    /**
     * Check if value is a Number
     * @returns {boolean}
     */
    isNumber() {
        return Object.prototype.toString.call(this.value) === '[object Number]'
    }

    /**
     * Check if value is a String
     * @returns {boolean}
     */
    isString() {
        return Object.prototype.toString.call(this.value) === '[object String]'
    }

    /**
     * Check if value is a Boolean
     * @returns {boolean}
     */
    isBoolean() {
        return Object.prototype.toString.call(this.value) === '[object Boolean]'
    }

    /**
     * Check if value is a Function
     * @returns {boolean}
     */
    isFunction() {
        return (
            Object.prototype.toString.call(this.value) === '[object Function]'
        )
    }

    /**
     * Check if value is a Promise
     * @returns {boolean}
     */
    isPromise() {
        return Object.prototype.toString.call(this.value) === '[object Promise]'
    }

    /**
     * Check if value is a hex string
     * @returns {boolean}
     */
    isHex({ length = 0, prefix = false } = {}) {
        prefix = prefix ? '0x' : ''
        length = length > 0 ? length : ''

        const regex = new RegExp(`^${prefix}[0-9A-Fa-f]{1,${length}}$`, 'g')
        return regex.test(this.value)
    }

    /**
     * Check if value is a jwt
     * @returns {boolean}
     */
    isJwt() {
        const regex = /^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/
        return regex.test(this.value)
    }

    /**
     * Check if value is a url
     * @returns {boolean}
     */
    isURL() {
        try {
            new URL(this.value)
            return true
        } catch (error) {
            return false
        }
    }

    /**
     * Validate a Joi Object Schema
     * @param {Joi.Object} schema
     * @returns {Object}
     */
    validateJoiSchema(schema) {
        const { error, value } = schema.validate(this.value)

        if (error) {
            throw String(ValidationErrorMessage(error))
        }

        return value
    }

    /**
     * Validate a Joi Object Schema
     * @param {Joi.Object} schema
     * @returns {Object}
     */
    validateAsyncJoiSchema(schema) {
        return new Promise(async (resolve, reject) => {
            try {
                const value = await schema.validateAsync(this.value)

                resolve(value)
            } catch (error) {
                const _error = ValidationErrorMessage(error)
                reject(_error)
            }
        })
    }
}

/**
 * General Validator
 * @param {Any} value
 * @returns {GeneralValidator}
 */
export default function (value) {
    return new GeneralValidator(value)
}
