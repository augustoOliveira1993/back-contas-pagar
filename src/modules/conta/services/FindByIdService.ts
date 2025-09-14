import { injectable, inject } from 'tsyringe';
import { BadRequestError } from '@shared/errors/AppError';
import { IContaRepository } from '@modules/conta/repositories/IContaRepository';

@injectable()
export default class FindByIdService {
  constructor(
    @inject('ContaRepository')
    private repository: IContaRepository,
  ) {}

  public async execute(id: string) {
    const roleExist = await this.repository.findOne({
      _id: id,
    });
    if (!roleExist) {
      throw new BadRequestError({
        message: 'Conta não encontrada',
      });
    }
    return roleExist;
  }
}
