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
    },
    { sequelize: db, modelName: 'Reservation' }
)

export default ReservationModel
