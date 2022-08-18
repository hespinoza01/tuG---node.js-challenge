import { RouterBuilder } from '../../builders'
import { RoomController } from '../../controllers'

const router = new RouterBuilder()

router
    .addRoute('/', {
        post: RoomController.create,
        get: RoomController.list,
    })
    .addRoute('/:id', {
        get: RoomController.detail,
        put: RoomController.update,
    })

export default router.build()
