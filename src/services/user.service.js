import { UserModel } from '../models'
import { EncodePassword, AuthToken } from '../utils'

const UserService = {}

/**
 * Register a new admin user
 * @param {Object} data
 * @param {String} data.fullname
 * @param {String} data.email
 * @param {String} data.password
 * @returns {Object}
 */
UserService.create = function ({ fullname, email, password }) {
    return new Promise(async (resolve, reject) => {
        try {
            const registeredUser = await UserModel.findByEmail(email)

            if (registeredUser) {
                throw String('email already registered')
            }

            const user = await UserModel.create({
                fullname,
                email,
                password,
            })

            resolve(ommitKey(user.get({ plain: true }), 'password'))
        } catch (error) {
            reject(`UserService.create: ${error}`)
        }
    })
}

/**
 * Update already registered user info
 * @param {Object} data
 * @param {Number} data.id - user id
 * @param {String} data.fullname
 * @param {String} data.email
 * @param {String} data.password
 * @returns {Boolean}
 */
UserService.update = function ({ id, fullname, email, password }) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findByPk(id)

            if (!user) {
                throw String('user not found')
            }

            await user.update({
                fullname,
                email,
                password,
            })

            resolve(true)
        } catch (error) {
            reject(`UserService.create: ${error}`)
        }
    })
}

/**
 * Get user info by id
 * @param {Number} id - user id
 * @returns {Object}
 */
UserService.get = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findByPk(id)

            if (!user) {
                throw String('user not found')
            }

            resolve(ommitKey(user.get({ plain: true }), 'password'))
        } catch (error) {
            reject(`UserService.create: ${error}`)
        }
    })
}

/**
 * List all user admin registered
 * @returns {Array<Object>}
 */
UserService.list = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await UserModel.findAll({
                raw: true,
                attributes: { exclude: ['password'] },
                order: [['id', 'DESC']],
            })

            resolve(users)
        } catch (error) {
            reject(`UserService.create: ${error}`)
        }
    })
}

/**
 * Check user credentials and generate auth token
 * @returns {Array<Object>}
 */
UserService.login = function ({ email, password: rawPassword }) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findByEmail(email)

            if (!user) {
                throw String('user not found')
            }

            if (EncodePassword(rawPassword) !== user.password) {
                throw String('invalid credentials')
            }

            const response = ommitKey(
                user,
                'password',
                'createdAt',
                'updatedAt'
            )
            response.token = await AuthToken.create(response, 0)

            resolve(response)
        } catch (error) {
            reject(`UserService.create: ${error}`)
        }
    })
}

export default Object.freeze(UserService)
