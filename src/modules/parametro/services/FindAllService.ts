import { injectable, inject } from 'tsyringe';
import { IParametroDTO } from '@modules/parametro/dto/IParametroDTO';
import { IParametroRepository } from '@modules/parametro/repositories/IParametroRepository';
import { QueryOptions } from 'mongoose';

@injectable()
export default class FindAllService {
  constructor(
    @inject('ParametroRepository')
    private repository: IParametroRepository,
  ) {}

  public async execute(query: QueryOptions<IParametroDTO>) {
    let queryParamns = {};
    return {
      total: await this.repository.count(queryParamns),
      data: await this.repository.findAll(queryParamns),
    };
  }
}
