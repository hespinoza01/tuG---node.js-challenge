import { DataTypes as types, Model } from 'sequelize'
import { db } from '../config'

class ReservationModel extends Model {}

ReservationModel.init(
    {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        days: {
            type: types.INTEGER,
            allowNull: false,
        },
        UserId: {
            type: types.INTEGER,
            allowNull: false,
        },
        PersonId: {
            type: types.INTEGER,
            allowNull: false,
        },
        RoomId: {
            type: types.INTEGER,
            allowNull: false,
        },
        ReservationStatusId: {
            type: types.INTEGER,
            allowNull: false,
        },
    },
    { sequelize: db, modelName: 'Reservation' }
)

export default ReservationModel
