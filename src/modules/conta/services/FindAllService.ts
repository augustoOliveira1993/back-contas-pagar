import { injectable, inject } from 'tsyringe';
import { IContaDTO } from '@modules/conta/dto/IContaDTO';
import { IContaRepository } from '@modules/conta/repositories/IContaRepository';
import { QueryOptions } from 'mongoose';

@injectable()
export default class FindAllService {
  constructor(
    @inject('ContaRepository')
    private repository: IContaRepository,
  ) {}

  public async execute(query: QueryOptions<IContaDTO>) {
    let queryParamns = {};
    return {
      total: await this.repository.count(queryParamns),
      data: await this.repository.findAll(queryParamns),
    };
  }
}
