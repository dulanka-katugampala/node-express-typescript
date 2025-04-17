import { NextFunction, Router,Request,Response } from 'express';
import { authSignup, authSignin, authRefresh, authLogout } from '../controllers';
import { signupValidator, signinValidator } from '../middlewear/validators/authValidators';
import { authMiddlewear } from '../middlewear/authMiddlewear';

const userRoutes = Router();

userRoutes.post('/signup', signupValidator, authSignup);
userRoutes.post('/signin', signinValidator, authSignin);
userRoutes.post('/refresh', authRefresh);
userRoutes.post('/logout',  authMiddlewear, authLogout);

userRoutes.post('/protected', authMiddlewear, (req: Request, res: Response, next: NextFunction) => {
    res.json({
        ok: true,
        test: 'works!'
    })
});

export default userRoutes;