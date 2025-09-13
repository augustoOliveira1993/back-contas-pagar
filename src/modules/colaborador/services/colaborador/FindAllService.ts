import { injectable, inject } from 'tsyringe';
import { QueryOptions } from 'mongoose';
import IColaboradorRepository from '@modules/colaborador/repositories/IColaboradorRepository';
import { IColaboradorDTO } from '@modules/colaborador/dto/IColaboradorDTO';

@injectable()
export default class FindAllService {
  constructor(
    @inject('ColaboradorRepository')
    private repository: IColaboradorRepository,
  ) {}

  public async execute(query: QueryOptions<IColaboradorDTO>) {
    let queryParams = {};
    if (query.search) {
      queryParams = {
        ...queryParams,
        name: { $regex: query.search, $options: 'i' },
      };
    }

    if (query.category) {
      queryParams = {
        ...queryParams,
        category: { $regex: query.category, $options: 'i' },
      };
    }
    return {
      total: await this.repository.count(queryParams),
      data: await this.repository.findAll(queryParams),
    };
  }
}
