import { Model, QueryOptions } from 'mongoose';
import { PermissaoGrupo } from '@modules/users/infra/mongo/models/PermissaoGrupo';
import {
  IPermissaoGrupoDTO,
  IPermissaoGrupoDocument,
} from '@modules/users/dto/IPermissaoGrupoDTO';
import IPermissaoGrupoRepository from '@modules/users/repositories/IPermissaoGrupoRepository';

class PermissaoGrupoRepository implements IPermissaoGrupoRepository {
  private model: Model<IPermissaoGrupoDocument>;

  constructor() {
    this.model = PermissaoGrupo;
  }

  async create(data: IPermissaoGrupoDTO): Promise<IPermissaoGrupoDocument> {
    const role = new this.model(data);
    return await role.save();
  }

  async findAll(
    query: QueryOptions<IPermissaoGrupoDTO> = {},
  ): Promise<IPermissaoGrupoDocument[]> {
    return await this.model.find(query);
  }

  async update(
    id: string,
    data: IPermissaoGrupoDTO,
  ): Promise<IPermissaoGrupoDocument | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IPermissaoGrupoDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<IPermissaoGrupoDocument | null> {
    return await this.model.findById(id);
  }

  async findByName(name: string): Promise<IPermissaoGrupoDocument | null> {
    return await this.model.findOne({ name });
  }

  async findOne(
    criterio: QueryOptions<IPermissaoGrupoDTO> = {},
  ): Promise<IPermissaoGrupoDocument | null> {
    return await this.model.findOne(criterio);
  }

  async deleteMany(): Promise<boolean> {
    const allDeleted = await await this.model.deleteMany({});
    return !!allDeleted;
  }
}

export default PermissaoGrupoRepository;
