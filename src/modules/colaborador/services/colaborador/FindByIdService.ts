import { injectable, inject } from 'tsyringe';
import { NotFoundError } from '@shared/errors/AppError';
import IColaboradorRepository from '@modules/colaborador/repositories/IColaboradorRepository';

@injectable()
class CreateService {
  constructor(
    @inject('ColaboradorRepository')
    private repository: IColaboradorRepository,
  ) {}

  public async execute(id: string) {
    const roleExist = await this.repository.findById(id);
    if (!roleExist) {
      throw new NotFoundError({ message: 'Colaborador não encontrada' });
    }
    return roleExist;
  }
}

export default CreateService;
