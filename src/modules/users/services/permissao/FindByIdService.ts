import { injectable, inject } from 'tsyringe';
import IPermissaoRepository from '../../repositories/IPermissaoRepository';
import { NotFoundError } from '@shared/errors/AppError';

@injectable()
class CreateService {
  constructor(
    @inject('PermissaoRepository')
    private repository: IPermissaoRepository,
  ) {}

  public async execute(id: string) {
    const exist = await this.repository.findById(id);
    if (!exist) {
      throw new NotFoundError({ message: 'Permissao não encontrada' });
    }
    return exist;
  }
}

export default CreateService;
