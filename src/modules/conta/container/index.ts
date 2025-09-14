import { container } from 'tsyringe';
import { IContaRepository } from '../repositories/IContaRepository';
import { ContaRepository } from '../infra/mongo/repositories/ContaRepository';

container.registerSingleton<IContaRepository>(
  'ContaRepository',
  ContaRepository,
);
