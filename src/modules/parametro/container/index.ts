import { container } from 'tsyringe';
import { ParametroRepository } from '@modules/parametro/infra/mongo/repositories/ParametroRepository';
import { IParametroRepository } from '@modules/parametro/repositories/IParametroRepository';

container.registerSingleton<IParametroRepository>(
  'ParametroRepository',
  ParametroRepository,
);
