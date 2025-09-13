import { injectable, inject } from 'tsyringe';
import { ICargoRepository } from '@modules/cargo/repositories/ICargoRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { ICargoDTO } from '@modules/cargo/dto/ICargoDTO';

@injectable()
export default class UpdateService {
  constructor(
    @inject('CargoRepository')
    private repository: ICargoRepository,
  ) {}

  public async execute(id: string, data: ICargoDTO) {
    const nomeExist = await this.repository.findOne({
      nome: data.nome,
      _id: { $ne: id },
    });
    if (nomeExist) {
      throw new BadRequestError({
        message: 'Nome já cadastrado',
      });
    }
    const roleExist = await this.repository.findById(id);
    if (!roleExist) {
      throw new BadRequestError({
        message: 'Cargo não encontrada',
      });
    }

    return await this.repository.update(id, data);
  }
}
