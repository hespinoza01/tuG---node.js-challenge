import logger from '../logger'
import emoji from 'node-emoji'
import { GeneralValidator } from '../validators'

function logError(msg, type) {
    const c = emoji.get(`:${type}:`)
    return `${c} ${msg} | Api Error`
}

function logSuccess(msg, type) {
    const c = emoji.get(`:${type}:`)
    return `${c} ${msg} | Api Message`
}

function clearErrorMessage(error) {
    return error
        .replace(/[a-zA-Z]{1,}.[a-zA-Z]{1,}: /gi, '')
        .replace(/JsonWebTokenError: /gm, '')
        .replace(/TokenExpiredError: /gm, '')
        .replace(/^.{1,} -> ResponseError: /gm, '')
        .replace('\n', '<--')
        .replace(/\(/m, '<--')
        .split('<--')[0]
}

export default class ApiResponse {
    constructor(code, message, emoji, error) {
        this.code = code
        this.body = message
        this.emoji = emoji
        this.error = error
    }

    static badRequest(msg) {
        return new ApiResponse(400, msg, 'angry', true)
    }

    static notAuthenticated(msg) {
        return new ApiResponse(401, msg, 'scream', true)
    }

    static notAuthorized(msg) {
        return new ApiResponse(403, msg, 'space_invader', true)
    }

    static notFound(msg) {
        return new ApiResponse(404, msg, 'space_invader', true)
    }

    static notAllowed(msg) {
        return new ApiResponse(405, msg, 'space_invader', true)
    }

    static internal(msg) {
        return new ApiResponse(500, msg, 'confused', true)
    }

    static success(msg) {
        return new ApiResponse(200, msg, 'smiley', false)
    }
}

export class RequestResponse {
    constructor(apiResponse, req) {
        this.code = apiResponse.code
        this.emoji = apiResponse.emoji
        this.body = {
            error: apiResponse.error,
            // clear internal error label
            data: GeneralValidator(apiResponse.body).isString()
                ? clearErrorMessage(apiResponse.body)
                : apiResponse.body,
        }

        let logMsg = `[${req.method}] ${req.originalUrl}`
        let logFunction

        if (apiResponse.error) {
            logMsg = logError(logMsg + ` ${apiResponse.body}`, this.emoji)
            logFunction = logger.error
        } else {
            logMsg = logSuccess(logMsg, this.emoji)
            logFunction = logger.info
        }

        logFunction(logMsg)
    }
}
