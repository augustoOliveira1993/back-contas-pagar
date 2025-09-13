import { injectable, inject } from 'tsyringe';
import { ICargoRepository } from '@modules/cargo/repositories/ICargoRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { ICargoDTO } from '@modules/cargo/dto/ICargoDTO';
import { Cargo } from '@modules/cargo/infra/mongo/models/Cargo';

@injectable()
export default class CreateService {
  constructor(
    @inject('CargoRepository')
    private repository: ICargoRepository,
  ) {}

  public async execute(data: ICargoDTO) {
    const nomeExist = await this.repository.findOne({
      nome: data.nome,
    });
    if (nomeExist) {
      throw new BadRequestError({
        message: 'Nome já cadastrado',
      });
    }
    const created = await this.repository.create(data);
    if (!created) {
      throw new BadRequestError({
        message: 'Error creating Cargo',
      });
    }
    return {
      success: true,
      message: 'Cargo created successfully',
      data: created,
    };
  }
}
