import { Router } from 'express';
import middlewares from '@middleware/index';
import AuthController from '../controllers/AuthController';

const router = Router();
const controller = new AuthController();

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

router.post(
  '/signup',
  [middlewares.verifySignUp.checkDuplicateUsernameOrEmail],
  controller.signup,
);

router.get('/me', [middlewares.authJwt.verifyToken], controller.getUserAuth);

router.post('/signin', controller.signin);

router.post('/refresh', controller.refreshToken);

router.get(
  '/abilities',
  [middlewares.authJwt.verifyToken],
  controller.getAbilityUserAuth,
);

export default router;
