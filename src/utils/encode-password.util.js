import { SHA256 } from 'crypto-js'
import { constants } from '../config'

/**
 * Create a encode hash for password
 * @param {String} password - password to encode
 * @return {String}
 */
export default function EncodePassword(password) {
    const encoded = SHA256(password, constants.SECRET_KEY).toString()

    return encoded
}
