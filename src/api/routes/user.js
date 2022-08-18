import { RouterBuilder } from '../../builders'
import { UserController } from '../../controllers'

const router = new RouterBuilder()

router
    .addRoute('/', {
        post: UserController.create,
        put: UserController.update,
        get: UserController.list,
    })
    .addRoute('/login', {
        post: UserController.login,
    })
    .addRoute('/:id', {
        get: UserController.detail,
    })

export default router.build()
