import { Router } from 'express';
import NotificationController from '@modules/notification/infra/https/controllers/Notificationontroller';
import middlewares from '@middleware/index';

const routers = Router();
const controller = new NotificationController();

routers.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

routers.post(
  '/mark-all-read',
  [middlewares.authJwt.verifyToken],
  controller.redAllNotify,
);

routers.post('/', [middlewares.authJwt.verifyToken], controller.create);

routers.post(
  '/created-end-notify',
  [middlewares.authJwt.verifyToken],
  controller.createAndNotify,
);

routers.get('/', [middlewares.authJwt.verifyToken], controller.findAll);

routers.get('/:id', [middlewares.authJwt.verifyToken], controller.findById);

routers.post(
  '/:id/read',
  [middlewares.authJwt.verifyToken],
  controller.redNotify,
);

routers.put('/:id', [middlewares.authJwt.verifyToken], controller.update);

routers.delete('/:id', [middlewares.authJwt.verifyToken], controller.delete);

export default routers;
