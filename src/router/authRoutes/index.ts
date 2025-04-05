import { Router } from 'express';
import { authSignup } from '../../controllers';
import { signupValidator } from '../../middlewear/validators/authValidators';

const userRoutes = Router();

userRoutes.post('/signup', signupValidator, authSignup);

export default userRoutes;