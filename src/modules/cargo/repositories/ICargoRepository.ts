import {ICargoDocument, ICargoDTO} from "@modules/cargo/dto/ICargoDTO";
import {QueryOptions} from "mongoose";

export interface ICargoRepository {
  create(data: ICargoDTO): Promise<ICargoDocument>;

  findById(id: string): Promise<ICargoDocument | null>;

  findAll(query?: QueryOptions<ICargoDTO>): Promise<ICargoDocument[]>;

  update(id: string, data: ICargoDTO): Promise<ICargoDocument | null>;
  findOne(query?: any): Promise<ICargoDocument | null>;

  delete(id: string): Promise<ICargoDocument | null>;

  count(query?: QueryOptions<ICargoDTO>): Promise<number>;
}