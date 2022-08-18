import { RouterBuilder } from '../../builders'
import { RoomTypeController } from '../../controllers'

const router = new RouterBuilder()

router
    .addRoute('/', {
        post: RoomTypeController.create,
        get: RoomTypeController.list,
    })
    .addRoute('/:id', {
        get: RoomTypeController.detail,
        put: RoomTypeController.update,
    })

export default router.build()
