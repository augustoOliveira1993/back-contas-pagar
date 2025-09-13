import { Router } from 'express';
import ColaboradorController from '@modules/colaborador/infra/https/controllers/ColaboradorController';
import middlewares from '@middleware/index';
import multer from 'multer';

const upload = multer();

const routers = Router();
const controller = new ColaboradorController();

routers.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

routers.post(
  '/',
  [middlewares.authJwt.verifyToken],
  upload.single('foto'),
  controller.create,
);

routers.get('/', [middlewares.authJwt.verifyToken], controller.findAll);

routers.get('/:id', [middlewares.authJwt.verifyToken], controller.findById);

routers.put(
  '/:id',
  [middlewares.authJwt.verifyToken],
  upload.single('foto'),
  controller.update,
);

routers.delete('/:id', [middlewares.authJwt.verifyToken], controller.delete);

export default routers;
