import { Router } from 'express';
import addressRouter from '../modules/address/controllers/post.controller.js'
import userRouter from '../modules/user/routes/user.route.js'
import orderRouter from '../modules/order/controllers/post.controller.js'
import productRouter from '../modules/product/controllers/post.controller.js'
const apiRouter = Router();

apiRouter.use('/address', addressRouter);
apiRouter.use('/product', productRouter);
apiRouter.use('/order', orderRouter);
apiRouter.use('/user', userRouter);

// Agar future me aur modules add karna ho
// router.use('/booking', bookingRouter);
// router.use('/user', userRouter);

export default apiRouter;
