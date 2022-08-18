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
        ReservationId: {
            type: types.INTEGER,
            allowNull: false,
        },
        PaymentTypeId: {
            type: types.INTEGER,
            allowNull: false,
        },
    },
    { sequelize: db, modelName: 'Payment', timestamps: false }
)

export default PaymentModel
