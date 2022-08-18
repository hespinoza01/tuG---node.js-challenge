import {
    ReservationModel,
    ReservationStatusModel,
    RoomModel,
    RoomTypeModel,
    PersonModel,
} from '../models'

const ReservationService = {}

/**
 * Create a new reservation
 * @param {Object} data
 * @param {Number} data.days
 * @param {Number} data.userId
 * @param {Number} data.personId
 * @param {Number} data.roomId
 * @param {Number} data.status
 * @returns {Promise<Object>}
 */
ReservationService.create = function ({
    days,
    userId: UserId,
    personId: PersonId,
    roomId: RoomId,
    status: ReservationStatusId,
}) {
    return new Promise(async (resolve, reject) => {
        try {
            const reservation = await ReservationModel.create({
                days,
                UserId,
                PersonId,
                RoomId,
                ReservationStatusId,
            })

            resolve(reservation.get({ plain: true }))
        } catch (error) {
            reject(`ReservationService.create: ${error}`)
        }
    })
}

/**
 * Update a existing reservation
 * @param {Object} data
 * @param {Number} data.id
 * @param {Number} data.days
 * @param {Number} data.userId
 * @param {Number} data.personId
 * @param {Number} data.roomId
 * @param {Number} data.status
 * @returns {Promise<Boolean>}
 */
ReservationService.update = function ({
    id,
    days,
    userId: UserId,
    personId: PersonId,
    roomId: RoomId,
    status: ReservationStatusId,
}) {
    return new Promise(async (resolve, reject) => {
        try {
            const reservation = await ReservationModel.findByPk(id)

            if (!reservation) {
                throw String('reservation not found')
            }

            await reservation.update({
                days,
                UserId,
                PersonId,
                RoomId,
                ReservationStatusId,
            })

            resolve(true)
        } catch (error) {
            reject(`ReservationService.update: ${error}`)
        }
    })
}

/**
 * Get reservation detail by id
 * @param {Number} id
 * @returns {Promise<Object>}
 */
ReservationService.get = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            const _reservation = await ReservationModel.findByPk(id, {
                include: [PersonModel, ReservationStatusModel],
                nest: true,
            })

            if (!_reservation) {
                throw String('reservation not found')
            }
            const reservation = _reservation.get({ plain: true })
            const _room = await RoomModel.findByPk(reservation.RoomId, {
                include: RoomTypeModel,
                nest: true,
            })
            const room = _room.get({ plain: true })
            const { RoomType } = room
            const { ReservationStatus, Person } = reservation

            delete reservation.RoomId
            delete reservation.PersonId
            delete reservation.ReservationStatusId
            delete reservation.ReservationStatus
            delete reservation.Person
            delete room.RoomTypeId
            delete room.createdAt
            delete room.updatedAt
            delete room.RoomType
            delete RoomType.createdAt
            delete RoomType.updatedAt
            delete RoomType.id
            delete Person.createdAt
            delete Person.updatedAt

            resolve({
                ...reservation,
                status: ReservationStatus.name,
                room: { ...room, ...RoomType },
                person: { ...Person },
            })
        } catch (error) {
            reject(`ReservationService.get: ${error}`)
        }
    })
}

ReservationService.getReservationAmount = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            const reservation = await ReservationService.get(id)
            const {
                days,
                room: { price },
            } = reservation

            resolve(days * price)
        } catch (error) {
            reject(`ReservationService.getReservationAmount: ${error}`)
        }
    })
}

/**
 * List all reservations
 * @returns {Promise<Array>}
 */
ReservationService.list = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const reservations = await ReservationModel.findAll({
                raw: true,
                order: [['id', 'DESC']],
            })

            resolve(reservations)
        } catch (error) {
            reject(`ReservationService.list: ${error}`)
        }
    })
}

export default Object.freeze(ReservationService)
