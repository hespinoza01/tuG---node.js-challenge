import { RouterBuilder } from '../../builders'
import { PersonController } from '../../controllers'

const router = new RouterBuilder()

router
    .addRoute('/', {
        get: PersonController.list,
        post: PersonController.create,
    })
    .addRoute('/:id', {
        get: PersonController.detail,
        put: PersonController.update,
    })

export default router.build()
