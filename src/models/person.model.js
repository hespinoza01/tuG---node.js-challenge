import { DataTypes as types, Model } from 'sequelize'
import { db } from '../config'

class PersonModel extends Model {
    /**
     * Search registered person by email
     * @param {String} email
     * @return {Object|null}
     */
    static async findByEmail(email) {
        const result = await PersonModel.findOne({ where: { email } })

        if (result) {
            return result.dataValues
        }

        return result
    }
}

PersonModel.init(
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
        dni: {
            type: types.STRING(60),
            allowNull: false,
        },
        telephone: {
            type: types.STRING(45),
            allowNull: false,
            unique: true,
        },
        email: {
            type: types.STRING(100),
            allowNull: false,
            unique: true,
        },
        direction: {
            type: types.STRING,
            allowNull: false,
        },
    },
    { sequelize: db, modelName: 'Person' }
)

export default PersonModel
