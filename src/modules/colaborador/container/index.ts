import { container } from 'tsyringe';

import IColaboradorRepository from '@modules/colaborador/repositories/IColaboradorRepository';
import ColaboradorRepository from '@modules/colaborador/infra/mongo/repositories/ColaboradorRepository';

container.registerSingleton<IColaboradorRepository>(
  'ColaboradorRepository',
  ColaboradorRepository,
);
