import { Model, QueryOptions } from 'mongoose';
import { ICargoRepository } from '@modules/cargo/repositories/ICargoRepository';
import { Cargo } from '@modules/cargo/infra/mongo/models/Cargo';
import { ICargoDocument, ICargoDTO } from '@modules/cargo/dto/ICargoDTO';
import { IModelPopulated } from '@shared/types/global';

export class CargoRepository implements ICargoRepository {
  private model: Model<ICargoDocument>;
  private modelPopulated: IModelPopulated[];

  constructor() {
    this.model = Cargo;
    this.modelPopulated = [];
  }

  public async create(CargoData: ICargoDTO): Promise<ICargoDocument> {
    return this.model.create(CargoData);
  }

  public async findById(id: string): Promise<ICargoDocument | null> {
    return this.model
      .findOne({
        _id: id,
      })
      .populate(this.modelPopulated);
  }

  public async findAll(
    query: QueryOptions<ICargoDTO> = {},
  ): Promise<ICargoDocument[]> {
    return this.model.find(query).populate(this.modelPopulated);
  }

  public async update(
    id: string,
    CargoData: ICargoDTO,
  ): Promise<ICargoDocument | null> {
    return this.model
      .findByIdAndUpdate(id, CargoData, { new: true })
      .populate(this.modelPopulated);
  }

  public async delete(id: string): Promise<ICargoDocument | null> {
    return this.model.findByIdAndDelete(id);
  }

  public async count(query: QueryOptions<ICargoDTO> = {}): Promise<number> {
    return this.model.countDocuments(query);
  }

  public async findOne(
    query?: Partial<ICargoDTO>,
  ): Promise<ICargoDocument | null> {
    return this.model.findOne(query).populate(this.modelPopulated);
  }
}
