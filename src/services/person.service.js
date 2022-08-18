import { PersonModel } from '../models'

const PersonService = {}

/**
 * Register a new person
 * @param {Object} data
 * @param {String} data.fullname
 * @param {String} data.dni
 * @param {String} data.telephone
 * @param {String} data.email
 * @param {String} data.direction
 * @returns {Promise<Object>}
 */
PersonService.create = function ({
    fullname,
    dni,
    telephone,
    email,
    direction,
}) {
    return new Promise(async (resolve, reject) => {
        try {
            const registeredPerson = await PersonModel.findByEmail(email)

            if (registeredPerson) {
                throw String('email already registered')
            }

            const person = await PersonModel.create({
                fullname,
                dni,
                telephone,
                email,
                direction,
            })

            resolve(person.get({ plain: true }))
        } catch (error) {
            reject(`PersonService.create: ${error}`)
        }
    })
}

/**
 * Update already registered person
 * @param {Object} data
 * @param {Number} data.id
 * @param {String} data.fullname
 * @param {String} data.dni
 * @param {String} data.telephone
 * @param {String} data.email
 * @param {String} data.direction
 * @returns {Promise<Object>}
 */
PersonService.update = function ({
    id,
    fullname,
    dni,
    telephone,
    email,
    direction,
}) {
    return new Promise(async (resolve, reject) => {
        try {
            const person = await PersonModel.findByPk(id)

            if (!person) {
                throw String('person not found')
            }

            await person.update({
                fullname,
                dni,
                telephone,
                email,
                direction,
            })

            resolve(true)
        } catch (error) {
            reject(`PersonService.update: ${error}`)
        }
    })
}

/**
 * Get person info by id
 * @param {Number} id
 * @returns {Object}
 */
PersonService.get = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            const person = await PersonModel.findByPk(id)

            if (!person) {
                throw String('person not found')
            }

            resolve(person.get({ plain: true }))
        } catch (error) {
            reject(`PersonService.get: ${error}`)
        }
    })
}

/**
 * List all registered persons
 * @returns {Array<Object>}
 */
PersonService.list = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const persons = await PersonModel.findAll({
                raw: true,
                order: [['id', 'DESC']],
            })

            resolve(persons)
        } catch (error) {
            reject(`PersonService.list: ${error}`)
        }
    })
}

export default Object.freeze(PersonService)
