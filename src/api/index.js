import { ApiBuilder } from '../builders'
import UserRoute from './routes/user'
import RoomTypeRoute from './routes/roomType'
import RoomRoute from './routes/room'
import PersonRoute from './routes/person'
import ReservationRoute from './routes/reservation'
import PaymentRoute from './routes/payment'

const api = new ApiBuilder()

api.add('/user', UserRoute)
    .add('/roomType', RoomTypeRoute)
    .add('/room', RoomRoute)
    .add('/person', PersonRoute)
    .add('/reservation', ReservationRoute)
    .add('/payment', PaymentRoute)

export default api.build()
