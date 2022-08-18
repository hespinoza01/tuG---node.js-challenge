import { sign, verify } from 'jsonwebtoken'
import { constants } from '../config'

const AuthToken = {}

/**
 * Create a new auth token
 * @param {Object} payload
 * @param {Number} [expiresIn=3600000]
 * @return {String}
 */
AuthToken.create = function (payload, expiresIn = 60 * 60 * 1000) {
    return new Promise((resolve, reject) => {
        const options = {}

        if (expiresIn > 0) {
            options.expiresIn = expiresIn
        }

        sign(payload, constants.JWT_SECRET_SIGN, options, (err, token) => {
            // check for errors
            if (err) {
                reject(err.message)
            }

            resolve(token)
        })
    })
}

/**
 * Decode a auth token
 * @param {String} token
 * @return {Object}
 */
AuthToken.decode = function (token) {
    return new Promise((resolve, reject) => {
        try {
            // if not token, raise error
            if (!token) {
                reject('Token is required')
            }

            verify(token, constants.JWT_SECRET_SIGN, (err, decoded) => {
                // if error on verify, raise message
                if (err) {
                    throw err
                }

                resolve(decoded)
            })
        } catch (error) {
            reject(error)
        }
    })
}

export default Object.freeze(AuthToken)
