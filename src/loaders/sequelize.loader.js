import {} from '../models'

export default async function (sequelizeInstance) {
    /** verify that there is a valid instance */
    if (!sequelizeInstance || !sequelizeInstance.sync) {
        return
    }

    /**
     * Se sobreescribe la isntancia, para crear un manejador global de errores
     */
    // sequelizeInstance.query = function () {
    //   return Sequelize.prototype.query.apply(this, arguments).catch(err => {
    //     throw err
    //   })
    // }

    // await sequelizeInstance.sync({ alter: true }).then(() => {
    //   console.log('All models has been created')
    // })
    // .catch(err => {
    //   console.log(err)
    // })

    return sequelizeInstance
}
