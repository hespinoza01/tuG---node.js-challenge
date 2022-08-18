import { RoomTypeModel } from '../models'

const RoomTypeService = {}

/**
 * Create a new available room type
 * @param {Object} data
 * @param {String} data.name
 * @param {Number} data.price
 * @param {Number} data.bedsQuantity
 * @param {Boolean} data.hasTv
 * @param {Boolean} data.hasJacuzzi
 * @param {Boolean} data.hasAirConditioning
 * @returns {Promise<Object>}
 */
RoomTypeService.create = function ({
    name,
    price,
    bedsQuantity,
    hasTv,
    hasJacuzzi,
    hasAirConditioning,
}) {
    return new Promise(async (resolve, reject) => {
        try {
            const roomType = await RoomTypeModel.create({
                name,
                price,
                bedsQuantity,
                hasTv,
                hasJacuzzi,
                hasAirConditioning,
            })

            resolve(roomType.get({ plain: true }))
        } catch (error) {
            reject(`RoomTypeService.create: ${error}`)
        }
    })
}

/**
 * Update a existing room type
 * @param {Object} data
 * @param {Number} data.id
 * @param {String} data.name
 * @param {Number} data.price
 * @param {Number} data.bedsQuantity
 * @param {Boolean} data.hasTv
 * @param {Boolean} data.hasJacuzzi
 * @param {Boolean} data.hasAirConditioning
 * @returns {Promise<Boolean>}
 */
RoomTypeService.update = function ({
    id,
    name,
    price,
    bedsQuantity,
    hasTv,
    hasJacuzzi,
    hasAirConditioning,
}) {
    return new Promise(async (resolve, reject) => {
        try {
            const roomType = await RoomTypeModel.findByPk(id)

            if (!roomType) {
                throw String('room type not found')
            }

            await roomType.update({
                name,
                price,
                bedsQuantity,
                hasTv,
                hasJacuzzi,
                hasAirConditioning,
            })

            resolve(true)
        } catch (error) {
            reject(`RoomTypeService.update: ${error}`)
        }
    })
}

/**
 * Get room type detail by id
 * @param {Number} id
 * @returns {Promise<Object>}
 */
RoomTypeService.get = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            const roomType = await RoomTypeModel.findByPk(id)

            if (!roomType) {
                throw String('room type not found')
            }

            resolve(roomType.get({ plain: true }))
        } catch (error) {
            reject(`RoomTypeService.get: ${error}`)
        }
    })
}

/**
 * List all available room type
 * @returns {Promise<Array>}
 */
RoomTypeService.list = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const roomsType = await RoomTypeModel.findAll({
                raw: true,
                order: [['id', 'DESC']],
            })

            resolve(roomsType)
        } catch (error) {
            reject(`RoomTypeService.list: ${error}`)
        }
    })
}

export default Object.freeze(RoomTypeService)
