import { Model, QueryOptions } from 'mongoose';
import { Colaborador } from '@modules/colaborador/infra/mongo/models/Colaborador';
import {
  IColaboradorDTO,
  IColaboradorDocument,
} from '@modules/colaborador/dto/IColaboradorDTO';
import IColaboradorRepository from '@modules/colaborador/repositories/IColaboradorRepository';
import { IModelPopulated } from '@shared/types/global';

export default class ColaboradorRepository implements IColaboradorRepository {
  private model: Model<IColaboradorDocument>;
  private modelPopulated: IModelPopulated[] = [];
  constructor() {
    this.model = Colaborador;
    this.modelPopulated = [];
  }
  findOne(
    query: QueryOptions<IColaboradorDTO>,
  ): Promise<IColaboradorDocument | null> {
    return this.model.findOne(query).populate(this.modelPopulated);
  }

  async create(data: IColaboradorDTO): Promise<IColaboradorDocument> {
    return await this.model.create(data);
  }

  async findAll(
    query: QueryOptions<IColaboradorDTO>,
  ): Promise<IColaboradorDocument[]> {
    return await this.model
      .find(query)
      .sort({ createdAt: -1 })
      .populate(this.modelPopulated);
  }

  async update(
    id: string,
    data: IColaboradorDTO,
  ): Promise<IColaboradorDocument | null> {
    return await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .populate(this.modelPopulated);
  }

  async delete(id: string): Promise<IColaboradorDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<IColaboradorDocument | null> {
    return await this.model.findById(id).populate(this.modelPopulated);
  }

  async count(query?: QueryOptions<IColaboradorDTO>): Promise<number> {
    return await this.model.countDocuments(query);
  }

  public async addItemFichaColaborador(
    id: string,
    itemsIds: string[],
  ): Promise<IColaboradorDocument | null> {
    return this.model.findByIdAndUpdate(id, {
      $push: { colaborador_ficha: itemsIds },
    });
  }
}
