import { RoomModel } from '../models'

const RoomService = {}

/**
 * Create a new room
 * @param {Object} data
 * @param {Boolean} data.enabled
 * @param {Number} data.roomTypeId
 * @returns {Promise<Object>}
 */
RoomService.create = function ({ enabled, roomTypeId }) {
    return new Promise(async (resolve, reject) => {
        try {
            const room = await RoomModel.create({
                enabled,
                RoomTypeId: roomTypeId,
            })

            resolve(room.get({ plain: true }))
        } catch (error) {
            reject(`RoomService.create: ${error}`)
        }
    })
}

/**
 * Update a existing room
 * @param {Object} data
 * @param {Number} data.id
 * @param {Boolean} data.enabled
 * @param {Number} data.roomTypeId
 * @returns {Promise<Boolean>}
 */
RoomService.update = function ({ id, enabled, roomTypeId }) {
    return new Promise(async (resolve, reject) => {
        try {
            const room = await RoomModel.findByPk(id)

            if (!room) {
                throw String('room not found')
            }

            await room.update({
                enabled,
                RoomTypeId: roomTypeId,
            })

            resolve(true)
        } catch (error) {
            reject(`RoomService.update: ${error}`)
        }
    })
}

/**
 * Get room detail by id
 * @param {Number} id
 * @returns {Promise<Object>}
 */
RoomService.get = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            const room = await RoomModel.findByPk(id)

            if (!room) {
                throw String('room not found')
            }

            resolve(room.get({ plain: true }))
        } catch (error) {
            reject(`RoomService.get: ${error}`)
        }
    })
}

/**
 * List all available rooms
 * @returns {Promise<Array>}
 */
RoomService.list = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const rooms = await RoomModel.findAll({
                raw: true,
                order: [['id', 'DESC']],
            })

            resolve(rooms)
        } catch (error) {
            reject(`RoomService.list: ${error}`)
        }
    })
}

export default Object.freeze(RoomService)
