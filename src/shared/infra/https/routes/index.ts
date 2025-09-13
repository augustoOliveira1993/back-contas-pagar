import { Router } from 'express';

import users from '@modules/users/infra/https/routes/userRouter';
import roleRoutes from '@modules/users/infra/https/routes/roleRouter';
import logRoutes from '@modules/log/infra/https/routes/logRouter';
import permissaoRoutes from '@modules/users/infra/https/routes/permissaoRouter';
import permissaoGrupoRoutes from '@modules/users/infra/https/routes/permissaoGrupoRouter';
import authRoles from '@modules/users/infra/https/routes/authRouter';
import notificationRouter from '@modules/notification/infra/https/routes/notificationRouter';
import colaboradorRouter from '@modules/colaborador/infra/https/routes/colaboradorRouter';
import parametroRouter from '@modules/parametro/infra/https/routes/parametroRouter';
import cargoRouter from '@modules/cargo/infra/https/routes/cargoRouter';
import eventoRouter from '@modules/evento/infra/https/routes/eventoRouter';

const routes = Router();

// Modulo AUTH
routes.use('/auth', authRoles);
// Modulo Usuarios
routes.use('/users', users);
routes.use('/roles', roleRoutes);
routes.use('/permissoes', permissaoRoutes);
routes.use('/permissao-grupos', permissaoGrupoRoutes);

routes.use('/logs', logRoutes);
routes.use('/notifications', notificationRouter);
routes.use('/colaboradores', colaboradorRouter);
routes.use('/parametros', parametroRouter);

routes.use('/cargos', cargoRouter);

routes.use('/eventos', eventoRouter);

export default routes;
