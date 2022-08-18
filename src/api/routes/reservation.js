import { RouterBuilder } from '../../builders'
import { ReservationController } from '../../controllers'

const router = new RouterBuilder()

router
    .addRoute('/', {
        post: ReservationController.create,
        get: ReservationController.list,
    })
    .addRoute('/:id', {
        get: ReservationController.detail,
        put: ReservationController.update,
    })

export default router.build()
