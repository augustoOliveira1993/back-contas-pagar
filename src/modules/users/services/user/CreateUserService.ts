import bcrypt from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import { IUserDTO } from '../../dto/IUserDTO';
import IUsersRepository from '../../repositories/IUsersRepository';
import { ConflictError } from '@shared/errors/AppError';
import { logger } from '@shared/utils/logger';
import authConfig from '@config/auth.config';
import { ExternalSocketManager } from '@shared/socket/ExternalSocketClient';
import IRoleRepository from '@modules/users/repositories/IRoleRepository';
@injectable()
export default class CreateService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
    @inject('ExternalSocketManager')
    private externalSocketManager: ExternalSocketManager,
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  public async execute(data: IUserDTO) {
    if (!data.password) {
      logger.info(`Senha não informada para o usuário ${data.email}`);
      data.password = authConfig.password_default!;
    }

    if (!data?.roles) {
      const defaultRole = await this.roleRepository.findByName('usuario');
      if (defaultRole) {
        data.roles = [defaultRole._id as string];
      }
    }
    console.log(data);
    const hashedPassword = bcrypt.hashSync(data.password, 8);

    const created = await this.repository.createUser({
      ...data,
      password: hashedPassword,
    });
    return {
      success: true,
      message: 'Users criada com sucesso!',
      data: created,
    };
  }
}
