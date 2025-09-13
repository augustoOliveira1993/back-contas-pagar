import { injectable, inject } from 'tsyringe';
import IPermissaoGrupoRepository from '../../repositories/IPermissaoGrupoRepository';
import { NotFoundError } from '@shared/errors/AppError';

@injectable()
class DeletePermissaoGrupoService {
  constructor(
    @inject('PermissaoGrupoRepository')
    private repository: IPermissaoGrupoRepository,
  ) {}

  public async execute(id: string) {
    const existDeleted = await this.repository.delete(id);
    if (!existDeleted) {
      throw new NotFoundError({ message: 'PermissaoGrupo não encontrada' });
    }
    return {
      success: true,
      message: 'PermissaoGrupo deletada com sucesso!',
      data: {
        id: existDeleted.id,
        name: existDeleted.name,
      },
    };
  }
}

export default DeletePermissaoGrupoService;
