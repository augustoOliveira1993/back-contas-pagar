import { container } from 'tsyringe';
import { IEventoRepository } from '../repositories/IEventoRepository';
import { EventoRepository } from '../infra/mongo/repositories/EventoRepository';

container.registerSingleton<IEventoRepository>(
  'EventoRepository',
  EventoRepository,
);
