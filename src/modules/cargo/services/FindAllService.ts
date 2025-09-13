import { injectable, inject } from 'tsyringe';
import { ICargoRepository } from '@modules/cargo/repositories/ICargoRepository';
import { ICargoDTO } from '@modules/cargo/dto/ICargoDTO';
import { QueryOptions } from 'mongoose';

@injectable()
export default class FindAllService {
  constructor(
    @inject('CargoRepository')
    private repository: ICargoRepository,
  ) {}

  public async execute(query: QueryOptions<ICargoDTO>) {
    let queryParamns = {};
    return {
      total: await this.repository.count(queryParamns),
      data: await this.repository.findAll(queryParamns),
    };
  }
}
