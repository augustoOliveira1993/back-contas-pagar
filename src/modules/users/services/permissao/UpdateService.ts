import { injectable, inject } from 'tsyringe';
import { IPermissaoDTO } from '../../dto/IPermissaoDTO';
import IPermissaoRepository from '../../repositories/IPermissaoRepository';
import { NotFoundError } from '@shared/errors/AppError';

@injectable()
export default class UpdateService {
  constructor(
    @inject('PermissaoRepository')
    private repository: IPermissaoRepository,
  ) {}

  public async execute(id: string, data: IPermissaoDTO) {
    const exist = await this.repository.findById(id);
    if (!exist) {
      throw new NotFoundError({ message: 'Permissao não encontrada' });
    }
    const updated = await this.repository.update(id, data);
    return {
      success: true,
      message: `Permissao atualizada com sucesso!`,
      data: updated,
    };
  }
}
