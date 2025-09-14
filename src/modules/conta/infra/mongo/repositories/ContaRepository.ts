import { Model, QueryOptions } from 'mongoose';
import { Conta } from '@modules/conta/infra/mongo/models/Conta';
import { IContaDocument, IContaDTO } from '@modules/conta/dto/IContaDTO';
import { IModelPopulated } from '@shared/types/global';
import { IContaRepository } from '@modules/conta/repositories/IContaRepository';

export class ContaRepository implements IContaRepository {
  private model: Model<IContaDocument>;
  private modelPopulated: IModelPopulated[];

  constructor() {
    this.model = Conta;
    this.modelPopulated = [];
  }

  public async create(ContaData: IContaDTO): Promise<IContaDocument> {
    return this.model.create(ContaData);
  }

  public async findById(id: string): Promise<IContaDocument | null> {
    return this.model.findOne({ _id: id }).populate(this.modelPopulated);
  }

  public async findOne(
    query: QueryOptions<IContaDTO> = {},
  ): Promise<IContaDocument | null> {
    return this.model.findOne(query).populate(this.modelPopulated);
  }

  public async findAll(
    query: Partial<IContaDTO> = {},
  ): Promise<IContaDocument[]> {
    return this.model
      .find(query)
      .populate(this.modelPopulated)
      .sort({ createdAt: -1 });
  }

  public async update(
    id: string,
    ContaData: IContaDTO,
  ): Promise<IContaDocument | null> {
    return this.model
      .findByIdAndUpdate(id, ContaData, { new: true })
      .populate(this.modelPopulated);
  }

  public async delete(id: string): Promise<IContaDocument | null> {
    return this.model.findByIdAndDelete(id).populate(this.modelPopulated);
  }

  public async count(query: QueryOptions<IContaDTO> = {}): Promise<number> {
    return this.model.countDocuments(query).populate(this.modelPopulated);
  }
}
