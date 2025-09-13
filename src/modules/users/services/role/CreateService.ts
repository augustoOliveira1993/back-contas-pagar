import { injectable, inject } from 'tsyringe';
import { IRoleDTO } from '../../dto/IRoleDTO';
import IRoleRepository from '../../repositories/IRoleRepository';
import { ConflictError } from '@shared/errors/AppError';

@injectable()
class CreateService {
  constructor(
    @inject('RoleRepository')
    private repository: IRoleRepository,
  ) {}

  public async execute(data: IRoleDTO) {
    const exist = await this.repository.findByName(data.name);
    if (exist) {
      throw new ConflictError({ message: 'O nome da role já existe' });
    }
    const created = await this.repository.create(data);
    return {
      success: true,
      message: 'Role criada com sucesso!',
      data: created,
    };
  }
}

export default CreateService;
