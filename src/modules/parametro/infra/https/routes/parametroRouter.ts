import { Router } from 'express';
import ParametroController from '@modules/parametro/infra/https/controllers/ParametroController';
import middlewares from '@middleware/index';

const router = Router();
const controller = new ParametroController();

router.post('/', [middlewares.authJwt.verifyToken], controller.create);

router.get('/', [middlewares.authJwt.verifyToken], controller.findAll);

router.get(
  '/key/:key',
  [middlewares.authJwt.verifyToken],
  controller.findByKey,
);

router.put(
  '/key/:key',
  [middlewares.authJwt.verifyToken],
  controller.updateByKey,
);

router.get('/:id', [middlewares.authJwt.verifyToken], controller.findById);

router.put('/:id', [middlewares.authJwt.verifyToken], controller.update);

router.delete('/:id', [middlewares.authJwt.verifyToken], controller.delete);

export default router;
