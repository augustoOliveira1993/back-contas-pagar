import { Router } from 'express';
import PermissaoGrupoController from '@modules/users/infra/https/controllers/PermissaoGrupoController';
import middlewares from '@middleware/index';

const permissaoGruposRouter = Router();
const controller = new PermissaoGrupoController();

permissaoGruposRouter.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

permissaoGruposRouter.post(
  '/',
  [middlewares.authJwt.verifyToken],
  controller.create,
);

permissaoGruposRouter.get(
  '/',
  [middlewares.authJwt.verifyToken],
  controller.findAll,
);

permissaoGruposRouter.get(
  '/:id',
  [middlewares.authJwt.verifyToken],
  controller.findById,
);

permissaoGruposRouter.put(
  '/:id',
  [middlewares.authJwt.verifyToken],
  controller.update,
);

permissaoGruposRouter.delete(
  '/:id',
  [middlewares.authJwt.verifyToken],
  controller.delete,
);

export default permissaoGruposRouter;
