import { injectable, inject } from 'tsyringe';
import IPermissaoGrupoRepository from '../../repositories/IPermissaoGrupoRepository';
import { NotFoundError } from '@shared/errors/AppError';

@injectable()
class CreateService {
  constructor(
    @inject('PermissaoGrupoRepository')
    private repository: IPermissaoGrupoRepository,
  ) {}

  public async execute(id: string) {
    const exist = await this.repository.findById(id);
    if (!exist) {
      throw new NotFoundError({ message: 'PermissaoGrupo não encontrada' });
    }
    return exist;
  }
}

export default CreateService;
