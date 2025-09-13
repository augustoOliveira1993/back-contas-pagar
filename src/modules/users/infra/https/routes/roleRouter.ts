import { Router } from 'express';
import RoleController from '@modules/users/infra/https/controllers/RoleController';
import middlewares from '@middleware/index';

const rolesRouter = Router();
const controller = new RoleController();

rolesRouter.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

rolesRouter.post('/', [middlewares.authJwt.verifyToken], controller.create);

rolesRouter.get('/', [middlewares.authJwt.verifyToken], controller.findAll);

rolesRouter.get(
  '/:idRole',
  [middlewares.authJwt.verifyToken],
  controller.findById,
);

rolesRouter.put(
  '/:idRole',
  [middlewares.authJwt.verifyToken],
  controller.update,
);

rolesRouter.delete(
  '/:idRole',
  [middlewares.authJwt.verifyToken],
  controller.delete,
);

rolesRouter.post('/:idRole/permissions', controller.addPermissionByRoleId);

export default rolesRouter;
