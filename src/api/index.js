import { ApiBuilder } from '../builders'
import UserRoute from './routes/user'
import RoomTypeRoute from './routes/roomType'
import RoomRoute from './routes/room'
import PersonRoute from './routes/person'

const api = new ApiBuilder()

api.add('/user', UserRoute)
    .add('/roomType', RoomTypeRoute)
    .add('/room', RoomRoute)
    .add('/person', PersonRoute)

export default api.build()
