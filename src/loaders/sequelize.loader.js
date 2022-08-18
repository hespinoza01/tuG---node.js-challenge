import mysql from 'mysql2/promise'
import logger from '../logger'
import { constants } from '../config'
import {
    RoomModel,
    RoomTypeModel,
    PersonModel,
    UserModel,
    ReservationModel,
    ReservationStatusModel,
    PaymentModel,
    PaymentTypeModel,
} from '../models'

const { DB } = constants
const connectionOptions = {
    host: DB.HOST,
    port: 3306,
    user: DB.USER,
    password: DB.PASS,
}

export default async function (sequelizeInstance) {
    /** verify that there is a valid instance */
    if (!sequelizeInstance || !sequelizeInstance.sync) {
        return
    }

    const connection = await mysql.createConnection(connectionOptions)
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB.NAME};`)

    // Model Relationships
    RoomModel.belongsTo(RoomTypeModel)
    RoomTypeModel.hasMany(RoomModel)

    ReservationModel.belongsTo(UserModel)
    ReservationModel.belongsTo(PersonModel)
    ReservationModel.belongsTo(RoomModel)
    ReservationModel.belongsTo(ReservationStatusModel)

    ReservationStatusModel.hasMany(ReservationModel)
    PersonModel.hasMany(ReservationModel)
    UserModel.hasMany(ReservationModel)
    RoomModel.hasMany(ReservationModel)

    PaymentModel.belongsTo(ReservationModel)
    PaymentModel.belongsTo(PaymentTypeModel)

    await sequelizeInstance
        .sync({ alter: false })
        .then(() => {
            logger.info('All models has been created')
        })
        .catch(err => {
            logger.error(err)
        })

    return sequelizeInstance
}
