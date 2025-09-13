import { Router } from 'express';
import UsersController from '@modules/users/infra/https/controllers/UserController';
import middlewares from '@middleware/index';

const router = Router();
const controller = new UsersController();

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

router.post('/', controller.create);

router.get('/', [middlewares.authJwt.verifyToken], controller.findAll);

router.get('/:id', [middlewares.authJwt.verifyToken], controller.findById);

router.put('/:id', [middlewares.authJwt.verifyToken], controller.updateUser);

router.delete('/:id', [middlewares.authJwt.verifyToken], controller.delete);

router.post(
  '/:id/roles',
  [middlewares.authJwt.verifyToken],
  controller.addRolesByUserId,
);

router.delete(
  '/:id/roles',
  [middlewares.authJwt.verifyToken],
  controller.removerRolesByUserId,
);

router.put('/edit', [middlewares.authJwt.verifyToken], controller.update);

router.post(
  '/:id/permissions',
  [middlewares.authJwt.verifyToken],
  controller.addPermissionByUserId,
);

router.delete(
  '/:id/permissions',
  [middlewares.authJwt.verifyToken],
  controller.removePermissionByUserId,
);

export default router;
