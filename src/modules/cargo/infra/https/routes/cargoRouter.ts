import { Router } from 'express';
import CargoController from '@modules/cargo/infra/https/controllers/CargoController';
import middlewares from '@middleware/index';

const router = Router();
const controller = new CargoController();

router.post('/', [middlewares.authJwt.verifyToken], controller.create);

router.get('/', [middlewares.authJwt.verifyToken], controller.findAll);

router.get('/:id', [middlewares.authJwt.verifyToken], controller.findById);

router.put('/:id', [middlewares.authJwt.verifyToken], controller.update);

router.delete('/:id', [middlewares.authJwt.verifyToken], controller.delete);

export default router;
