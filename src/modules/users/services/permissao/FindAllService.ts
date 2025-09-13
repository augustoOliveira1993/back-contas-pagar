import { injectable, inject } from 'tsyringe';
import { IPermissaoDTO, IResquestQuery } from '../../dto/IPermissaoDTO';
import IPermissaoRepository from '../../repositories/IPermissaoRepository';
import { Query, QueryOptions } from 'mongoose';

@injectable()
export default class FindAllService {
  constructor(
    @inject('PermissaoRepository')
    private repository: IPermissaoRepository,
  ) {}

  public async execute(query: QueryOptions<IPermissaoDTO>) {
    let queryParams = {};
    if (query.search) {
      const searchRegex = new RegExp(query.search, 'i');
      queryParams = {
        ...queryParams,
        $or: [{ name: { $regex: searchRegex } }],
      };
    }
    const data = await this.repository.findAll(queryParams);
    return {
      total: data.length,
      data,
    };
  }
}
