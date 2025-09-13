import { IPermissaoGrupoDTO } from '@modules/users/dto/IPermissaoGrupoDTO';
import IPermissaoGrupoRepository from '@modules/users/repositories/IPermissaoGrupoRepository';
import { QueryOptions } from 'mongoose';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class FindAllService {
  constructor(
    @inject('PermissaoGrupoRepository')
    private repository: IPermissaoGrupoRepository,
  ) {}

  public async execute(query: QueryOptions<IPermissaoGrupoDTO>) {
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
