import { injectable, inject } from 'tsyringe';
import { NotFoundError } from '@shared/errors/AppError';
import IRoleRepository from '@modules/users/repositories/IRoleRepository';
import { IRoleDTO } from '@modules/users/dto/IRoleDTO';

@injectable()
export default class UpdateService {
  constructor(
    @inject('RoleRepository')
    private repository: IRoleRepository,
  ) {}

  public async execute(idRole: string, data: IRoleDTO) {
    const exist = await this.repository.findById(idRole);
    if (!exist) {
      throw new NotFoundError({ message: 'Role não encontrada' });
    }
    const updated = await this.repository.update(idRole, data);
    return {
      success: true,
      message: `Role atualizada com sucesso!`,
      data: updated,
    };
  }
}
