import { DataTypes as types, Model } from 'sequelize'
import { db } from '../config'

class ReservationStatusModel extends Model {}

ReservationStatusModel.init(
    {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: types.STRING(60),
            allowNull: false,
        },
    },
    { sequelize: db, modelName: 'ReservationStatus' }
)

export default ReservationStatusModel
