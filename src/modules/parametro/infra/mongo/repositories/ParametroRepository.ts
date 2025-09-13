import { Model, QueryOptions } from 'mongoose';
import { Parametro } from '@modules/parametro/infra/mongo/models/Parametro';
import {
  IParametroDocument,
  IParametroDTO,
} from '@modules/parametro/dto/IParametroDTO';
import { IParametroRepository } from '@modules/parametro/repositories/IParametroRepository';
import { IModelPopulated } from '@shared/types/global';

export class ParametroRepository implements IParametroRepository {
  private model: Model<IParametroDocument>;
  private modelPopulated: IModelPopulated[];

  constructor() {
    this.model = Parametro;
    this.modelPopulated = [];
  }

  public async create(
    ParametroData: IParametroDTO,
  ): Promise<IParametroDocument> {
    return this.model.create(ParametroData);
  }

  public async findById(id: string): Promise<IParametroDocument | null> {
    return this.model.findOne({ _id: id }).populate(this.modelPopulated);
  }

  public async findOne(
    query: QueryOptions<IParametroDTO> = {},
  ): Promise<IParametroDocument | null> {
    return this.model.findOne(query).populate(this.modelPopulated);
  }

  public async findAll(
    query: Partial<IParametroDTO> = {},
  ): Promise<IParametroDocument[]> {
    return this.model
      .find(query)
      .populate(this.modelPopulated)
      .sort({ createdAt: -1 });
  }

  public async update(
    id: string,
    ParametroData: IParametroDTO,
  ): Promise<IParametroDocument | null> {
    return this.model
      .findByIdAndUpdate(id, ParametroData, { new: true })
      .populate(this.modelPopulated);
  }

  public async delete(id: string): Promise<IParametroDocument | null> {
    return this.model.findByIdAndDelete(id).populate(this.modelPopulated);
  }

  public async count(query: QueryOptions<IParametroDTO> = {}): Promise<number> {
    return this.model.countDocuments(query).populate(this.modelPopulated);
  }
}
