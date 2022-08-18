import expressLoader from './express.loader'
import sequelizeLoader from './sequelize.loader'

export default {
    async init({
        expressApp = null,
        expressRoutes = null,
        sequelizeInstance = null,
    }) {
        await sequelizeLoader(sequelizeInstance)
        await expressLoader(expressApp, expressRoutes)

        global.ommitKey = function (data, ...toOmmit) {
            const response = { ...data }

            for (let key of toOmmit) {
                delete response[key]
            }

            return response
        }
    },
}
