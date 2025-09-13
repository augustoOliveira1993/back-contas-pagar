import { injectable, inject } from 'tsyringe';
import { IPermissaoDTO } from '../../dto/IPermissaoDTO';
import IPermissaoRepository from '../../repositories/IPermissaoRepository';
import { ConflictError } from '@shared/errors/AppError';
import IPermissaoGrupoRepository from '@modules/users/repositories/IPermissaoGrupoRepository';

@injectable()
class CreateService {
  constructor(
    @inject('PermissaoRepository')
    private repository: IPermissaoRepository,
    @inject('PermissaoGrupoRepository')
    private permissaoGrupoRepository: IPermissaoGrupoRepository,
  ) {}

  public async execute(data: IPermissaoDTO) {
    let permissaoGrupoId = null;
    const nomeGrupo = data.name?.split(':')[0];
    const existNomeGrupo = await this.permissaoGrupoRepository.findByName(
      nomeGrupo as string,
    );
    if (!existNomeGrupo) {
      const created = await this.permissaoGrupoRepository.create({
        name: nomeGrupo as string,
      });
      permissaoGrupoId = created._id;
    } else {
      permissaoGrupoId = existNomeGrupo._id;
    }
    const exist = await this.repository.findByName(data.name as string);
    if (exist) {
      throw new ConflictError({ message: 'O nome da permissão já existe' });
    }
    const created = await this.repository.create({
      ...data,
      permissao_grupos: [permissaoGrupoId as string],
    });
    return {
      success: true,
      message: 'Permissao criada com sucesso!',
      data: await this.repository.findById(created._id as string),
    };
  }
}

export default CreateService;
