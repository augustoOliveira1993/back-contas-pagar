import { Model, QueryOptions } from 'mongoose';
import { Evento } from '@modules/evento/infra/mongo/models/Evento';
import { IEventoDocument, IEventoDTO } from '@modules/evento/dto/IEventoDTO';
import { IModelPopulated } from '@shared/types/global';
import { IEventoRepository } from '@modules/evento/repositories/IEventoRepository';

export class EventoRepository implements IEventoRepository {
  private model: Model<IEventoDocument>;
  private modelPopulated: IModelPopulated[];

  constructor() {
    this.model = Evento;
    this.modelPopulated = [];
  }

  public async create(EventoData: IEventoDTO): Promise<IEventoDocument> {
    return this.model.create(EventoData);
  }

  public async findById(id: string): Promise<IEventoDocument | null> {
    return this.model.findOne({ _id: id }).populate(this.modelPopulated);
  }

  public async findOne(
    query: QueryOptions<IEventoDTO> = {},
  ): Promise<IEventoDocument | null> {
    return this.model.findOne(query).populate(this.modelPopulated);
  }

  public async findAll(
    query: Partial<IEventoDTO> = {},
  ): Promise<IEventoDocument[]> {
    return this.model
      .find(query)
      .populate(this.modelPopulated)
      .sort({ createdAt: -1 });
  }

  public async update(
    id: string,
    EventoData: IEventoDTO,
  ): Promise<IEventoDocument | null> {
    return this.model
      .findByIdAndUpdate(id, EventoData, { new: true })
      .populate(this.modelPopulated);
  }

  public async delete(id: string): Promise<IEventoDocument | null> {
    return this.model.findByIdAndDelete(id).populate(this.modelPopulated);
  }

  public async count(query: QueryOptions<IEventoDTO> = {}): Promise<number> {
    return this.model.countDocuments(query).populate(this.modelPopulated);
  }
}
