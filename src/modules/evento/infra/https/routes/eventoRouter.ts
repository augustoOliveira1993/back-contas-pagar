import { Router } from 'express';
import EventoController from '@modules/evento/infra/https/controllers/EventoController';
import middlewares from '@middleware/index';
import multer from 'multer';

const upload = multer();
const router = Router();
const controller = new EventoController();

router.post(
  '/',
  [middlewares.authJwt.verifyToken],
  upload.single('foto'),
  controller.create,
);

router.get('/', [middlewares.authJwt.verifyToken], controller.findAll);

router.get(
  '/key/:key',
  [middlewares.authJwt.verifyToken],
  controller.findByKey,
);

router.get('/:id', [middlewares.authJwt.verifyToken], controller.findById);

router.put(
  '/:id',
  [middlewares.authJwt.verifyToken],
  upload.single('foto'),
  controller.update,
);

router.delete('/:id', [middlewares.authJwt.verifyToken], controller.delete);

export default router;
