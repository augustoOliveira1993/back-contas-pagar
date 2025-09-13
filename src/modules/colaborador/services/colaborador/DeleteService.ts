import { injectable, inject } from 'tsyringe';
import { NotFoundError } from '@shared/errors/AppError';
import IColaboradorRepository from '@modules/colaborador/repositories/IColaboradorRepository';

@injectable()
class DeleteColaboradorService {
  constructor(
    @inject('ColaboradorRepository')
    private repository: IColaboradorRepository,
  ) {}

  public async execute(id: string) {
    const roleDeleted = await this.repository.delete(id);
    if (!roleDeleted) {
      throw new NotFoundError({ message: 'Colaborador não encontrada' });
    }
    return {
      success: true,
      message: 'Colaborador deletada com sucesso!',
      data: {
        id: roleDeleted._id,
      },
    };
  }
}

export default DeleteColaboradorService;
