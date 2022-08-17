import { DataTypes as types, Model } from 'sequelize'
import { db } from '../config'

class UserModel extends Model {}

UserModel.init(
    {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fullname: {
            type: types.STRING(155),
            allowNull: false,
        },
        email: {
            type: types.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: types.STRING,
            allowNull: false,
        },
    },
    { sequelize: db, modelName: 'User' }
)

export default UserModel
