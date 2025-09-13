import { Router } from 'express';
import PermissaoController from '@modules/users/infra/https/controllers/PermissaoController';
import middlewares from '@middleware/index';
import { cacheMiddleware } from '@middleware/cacheMiddleware';

const permissoesRouter = Router();
const controller = new PermissaoController();

permissoesRouter.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

permissoesRouter.post(
  '/',
  [middlewares.authJwt.verifyToken],
  controller.create,
);

permissoesRouter.get(
  '/',
  [middlewares.authJwt.verifyToken],
  controller.findAll,
);

permissoesRouter.get(
  '/:id',
  [middlewares.authJwt.verifyToken],
  controller.findById,
);

permissoesRouter.put(
  '/:id',
  [middlewares.authJwt.verifyToken],
  controller.update,
);

permissoesRouter.delete(
  '/:id',
  [middlewares.authJwt.verifyToken],
  controller.delete,
);

export default permissoesRouter;
