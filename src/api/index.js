import { ApiBuilder } from '../builders'
import UserRoute from './routes/user'
import RoomTypeRoute from './routes/roomType'
import RoomRoute from './routes/room'

const api = new ApiBuilder()

api.add('/user', UserRoute)
    .add('/roomType', RoomTypeRoute)
    .add('/room', RoomRoute)

export default api.build()
