import { injectable, inject } from 'tsyringe';
import { ICargoRepository } from '@modules/cargo/repositories/ICargoRepository';
import { BadRequestError } from '@shared/errors/AppError';

@injectable()
export default class DeleteService {
  constructor(
    @inject('CargoRepository')
    private repository: ICargoRepository,
  ) {}

  public async execute(id: string) {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new BadRequestError({
        message: 'Cargo não encontrada',
      });
    }
    return {
      success: true,
      message: 'Cargo deletada com sucesso!',
      data: {
        id: deleted._id,
        name: deleted.nome,
      },
    };
  }
}
