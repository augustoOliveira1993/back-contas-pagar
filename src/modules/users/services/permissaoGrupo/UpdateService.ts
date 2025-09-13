import { injectable, inject } from 'tsyringe';
import { IPermissaoGrupoDTO } from '../../dto/IPermissaoGrupoDTO';
import IPermissaoGrupoRepository from '../../repositories/IPermissaoGrupoRepository';
import { NotFoundError } from '@shared/errors/AppError';

@injectable()
export default class UpdateService {
  constructor(
    @inject('PermissaoGrupoRepository')
    private repository: IPermissaoGrupoRepository,
  ) {}

  public async execute(idPermissaoGrupo: string, data: IPermissaoGrupoDTO) {
    const exist = await this.repository.findById(idPermissaoGrupo);
    if (!exist) {
      throw new NotFoundError({ message: 'PermissaoGrupo não encontrada' });
    }
    const updated = await this.repository.update(idPermissaoGrupo, data);
    return {
      success: true,
      message: `PermissaoGrupo atualizada com sucesso!`,
      data: updated,
    };
  }
}
