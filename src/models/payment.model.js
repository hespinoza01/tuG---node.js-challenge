import { DataTypes as types, Model } from 'sequelize'
import { db } from '../config'

class PaymentModel extends Model {}

PaymentModel.init(
    {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            type: types.FLOAT,
            allowNull: false,
        },
        paymentAt: {
            type: types.DATE,
            defaultValue: types.NOW,
        },
    },
    { sequelize: db, modelName: 'Payment', timestamps: false }
)

export default PaymentModel
