import { injectable, inject } from 'tsyringe';
import { ICargoRepository } from '@modules/cargo/repositories/ICargoRepository';
import { BadRequestError } from '@shared/errors/AppError';

@injectable()
export default class FindByIdService {
  constructor(
    @inject('CargoRepository')
    private repository: ICargoRepository,
  ) {}

  public async execute(id: string) {
    const roleExist = await this.repository.findById(id);
    if (!roleExist) {
      throw new BadRequestError({
        message: 'Cargo não encontrada',
      });
    }
    return roleExist;
  }
}
