import { DataTypes as types, Model } from 'sequelize'
import { db } from '../config'

class PaymentTypeModel extends Model {}

PaymentTypeModel.init(
    {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: types.STRING(100),
            allowNull: true,
            unique: true,
        },
    },
    { sequelize: db, modelName: 'PaymentType' }
)

export default PaymentTypeModel
