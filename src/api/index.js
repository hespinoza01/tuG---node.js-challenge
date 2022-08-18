import { ApiBuilder } from '../builders'
import UserRoute from './routes/user'

const api = new ApiBuilder()

api.add('/user', UserRoute)

export default api.build()
