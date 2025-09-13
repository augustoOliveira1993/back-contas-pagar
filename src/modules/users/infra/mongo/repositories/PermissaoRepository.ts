import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Permissao } from '@modules/users/infra/mongo/models/Permissao';
import {
  IPermissaoDTO,
  IPermissaoDocument,
} from '@modules/users/dto/IPermissaoDTO';
import IPermissaoRepository from '@modules/users/repositories/IPermissaoRepository';
import { IModelPopulated } from '@shared/types/global';

export default class PermissaoRepository implements IPermissaoRepository {
  private model: Model<IPermissaoDocument>;
  private modelPopulated: IModelPopulated[] = [];

  constructor() {
    this.model = Permissao;
    this.modelPopulated = [
      {
        path: 'roles',
        select: '-__v',
      },
      {
        path: 'permissao_grupos',
        select: '-__v',
      },
    ];
  }

  async create(data: IPermissaoDTO): Promise<IPermissaoDocument> {
    const role = new this.model(data);
    return await role.save();
  }

  async findAll(
    query: QueryOptions<IPermissaoDTO> = {},
  ): Promise<IPermissaoDocument[]> {
    return await this.model.find(query).populate(this.modelPopulated);
  }

  async update(
    id: string,
    data: IPermissaoDTO,
  ): Promise<IPermissaoDocument | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IPermissaoDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<IPermissaoDocument | null> {
    return await this.model.findById(id).populate(this.modelPopulated);
  }

  async findByName(name: string): Promise<IPermissaoDocument | null> {
    return await this.model.findOne({ name }).populate(this.modelPopulated);
  }
  async findOne(
    criterio: FilterQuery<IPermissaoDocument>,
  ): Promise<IPermissaoDocument | null> {
    return await this.model.findOne(criterio).populate(this.modelPopulated);
  }

  async deleteMany(): Promise<boolean> {
    const allDeleted = await await this.model.deleteMany({});
    return !!allDeleted;
  }
}
