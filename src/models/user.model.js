import { DataTypes as types, Model } from 'sequelize'
import { db } from '../config'
import { EncodePassword } from '../utils'

class UserModel extends Model {
    /**
     * Search user register by email
     * @param {String} email - email user to search
     * @return {Object|null}
     */
    static async findByEmail(email) {
        const result = await UserModel.findOne({ where: { email } })

        if (result) {
            return result.dataValues
        }

        return result
    }
}

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
            set(value) {
                this.setDataValue('password', EncodePassword(value))
            },
            get() {
                return this.getDataValue('password')
            },
        },
    },
    { sequelize: db, modelName: 'User' }
)

export default UserModel
