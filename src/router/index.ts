import {Router} from 'express';
import userRoutes from './auth';

const router = Router();

router.use('/auth',userRoutes);

export default router;