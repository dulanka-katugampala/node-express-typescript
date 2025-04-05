import {Router} from 'express';
import userRoutes from './authRoutes';

const router = Router();

router.use('/auth',userRoutes);

export default router;