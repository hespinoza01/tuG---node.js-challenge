import url from 'url'
import { v4 as uuid } from 'uuid'
import { GeneralValidator } from '../validators'

const GenericUtil = {}

GenericUtil.getServerBaseURL = function (request, path) {
    if (!request) {
        return ''
    }

    // get server url
    const baseURL = url.format({
        protocol: request.protocol,
        port: request.port,
        host: request.get('host'),
    })

    return path && GeneralValidator(path).isString()
        ? url.resolve(baseURL, path)
        : baseURL
}

GenericUtil.getApiV1BaseURL = function (request, path = '') {
    return GenericUtil.getServerBaseURL(request, `/api/v1/${path}`)
}

/**
 * Generic a random hex string
 * @param {Number} [length=16]
 * @returns {String}
 */
GenericUtil.getRandomHex = function (length = 16) {
    const rounds = Math.ceil(length / 16)
    let result = ''

    for (let i = 0; i < rounds; i++) {
        const buffer = Buffer.alloc(16)

        uuid({}, buffer)
        result += buffer.toString('hex')
    }

    return result.substring(0, length)
}

/**
 * Generic a random base64 hash
 * @param {Number} [length=45]
 * @returns {String}
 */
GenericUtil.getRandomHash = function (length = 45) {
    const baseString = GenericUtil.getRandomHex(length)
    const result = Buffer.from(baseString, 'binary')
        .toString('base64')
        .replaceAll('=', '')

    return result.substring(0, length)
}

/**
 * Generic a random number
 * @param {Number} [max=1000]
 * @returns {Number}
 */
GenericUtil.getRandomNumber = function (max = 1000) {
    return Math.floor(Math.random() * max) + 1
}

export default Object.freeze(GenericUtil)
