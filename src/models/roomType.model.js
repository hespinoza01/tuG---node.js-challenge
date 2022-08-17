import { DataTypes as types, Model } from 'sequelize'
import { db } from '../config'

class RoomTypeModel extends Model {}

RoomTypeModel.init(
    {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: types.STRING(155),
            allowNull: false,
        },
        price: {
            type: types.FLOAT,
            allowNull: false,
        },
        bedsQuantity: {
            type: types.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        hasTv: {
            type: types.BOOLEAN,
            defaultValue: false,
        },
        hasJacuzzi: {
            type: types.BOOLEAN,
            defaultValue: false,
        },
        hasAirConditioning: {
            type: types.BOOLEAN,
            defaultValue: false,
        },
    },
    { sequelize: db, modelName: 'RoomType' }
)

export default RoomTypeModel
