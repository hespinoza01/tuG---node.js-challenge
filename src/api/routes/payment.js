import { RouterBuilder } from '../../builders'
import { PaymentController } from '../../controllers'

const router = new RouterBuilder()

router
    .addRoute('/', {
        post: PaymentController.create,
        get: PaymentController.list,
    })
    .addRoute('/types', {
        get: PaymentController.listPaymentTypes,
    })
    .addRoute('/:id', {
        get: PaymentController.detail,
        // put: PaymentController.update,
    })

export default router.build()
