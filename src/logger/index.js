import buildDevLogger from './developmentLogger'
import buildProductLogger from './productionLogger'
import { constants } from '../config/index'

const { NODE_ENV } = constants

let logger =
    NODE_ENV === 'development' || NODE_ENV === 'test'
        ? buildDevLogger()
        : buildProductLogger()

export default logger
