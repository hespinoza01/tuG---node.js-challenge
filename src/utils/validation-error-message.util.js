/**
 * Extract error message from JoiError and return cleaned message error
 * @param {Joi.Error} JoiError - Error object provide for Joi schema validation
 * @return {String}
 */
export default function ValidationErrorMessage(JoiError) {
    if (Object.prototype.toString.call(JoiError) !== '[object Error]') {
        throw String(
            'ValidationErrorMessage: Param value is not a valid JoiError'
        )
    }
    // get base Joi error message
    const errorMessage = String(JoiError)

    // regex to remove start Joi error message
    const toReplaceRegex = /^(validationerror: )/gi
    const toReplaceRegexSecondary = /^(Error: )/gi

    const finalMessage = errorMessage
        .replace(toReplaceRegex, '')
        .replace(toReplaceRegexSecondary, '')

    return finalMessage.trimStart().trimEnd()
}
