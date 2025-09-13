import { Router } from 'express';
import LogController from '@modules/log/infra/https/controllers/LogController';
import middlewares from '@middleware/index';

const routers = Router();
const controller = new LogController();

routers.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

routers.post('/', [middlewares.authJwt.verifyToken], controller.create);

routers.get('/', [middlewares.authJwt.verifyToken], controller.findAll);

routers.get(
  '/last-registro',
  [middlewares.authJwt.verifyToken],
  controller.getLastRegistroByCategory,
);

routers.get('/:id', [middlewares.authJwt.verifyToken], controller.findById);

routers.put('/:id', [middlewares.authJwt.verifyToken], controller.update);

routers.delete('/:id', [middlewares.authJwt.verifyToken], controller.delete);

export default routers;
