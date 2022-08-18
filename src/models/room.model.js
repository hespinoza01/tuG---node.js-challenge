import { DataTypes as types, Model } from 'sequelize'
import { db } from '../config'

class RoomModel extends Model {}

RoomModel.init(
    {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enabled: {
            type: types.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        RoomTypeId: {
            type: types.INTEGER,
            allowNull: false,
        },
    },
    { sequelize: db, modelName: 'Room' }
)

export default RoomModel
