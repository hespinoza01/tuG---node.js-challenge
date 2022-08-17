import Sequelize from 'sequelize'
import Constants from './constants.config'

const { DB } = Constants

/** return an instance of the orm */
const db = new Sequelize(DB.NAME, DB.USER, DB.PASS, {
    dialect: DB.DIALECT,
    host: DB.HOST,
    dialectOptions: {
        multipleStatements: true,
    },
    logging: false,
    timezone: '-06:00',
})

export default db
