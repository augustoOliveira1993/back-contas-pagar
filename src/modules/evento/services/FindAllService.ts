import { injectable, inject } from 'tsyringe';
import { IEventoDTO } from '@modules/evento/dto/IEventoDTO';
import { IEventoRepository } from '@modules/evento/repositories/IEventoRepository';
import { QueryOptions } from 'mongoose';

@injectable()
export default class FindAllService {
  constructor(
    @inject('EventoRepository')
    private repository: IEventoRepository,
  ) {}

  public async execute(query: QueryOptions<IEventoDTO>) {
    let queryParamns = {};
    return {
      total: await this.repository.count(queryParamns),
      data: await this.repository.findAll(queryParamns),
    };
  }
}
