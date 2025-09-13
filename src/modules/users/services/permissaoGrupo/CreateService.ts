import { injectable, inject } from 'tsyringe';
import { IPermissaoGrupoDTO } from '../../dto/IPermissaoGrupoDTO';
import IPermissaoGrupoRepository from '../../repositories/IPermissaoGrupoRepository';
import { ConflictError } from '@shared/errors/AppError';

@injectable()
class CreateService {
  constructor(
    @inject('PermissaoGrupoRepository')
    private repository: IPermissaoGrupoRepository,
  ) {}

  public async execute(data: IPermissaoGrupoDTO) {
    const exist = await this.repository.findByName(data.name);
    if (exist) {
      throw new ConflictError({
        message: 'O nome da PermissaoGrupo já existe',
      });
    }
    const created = await this.repository.create(data);
    return {
      success: true,
      message: 'PermissaoGrupo criada com sucesso!',
      data: created,
    };
  }
}

export default CreateService;
