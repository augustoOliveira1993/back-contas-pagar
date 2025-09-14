import { injectable, inject } from 'tsyringe';
import { BadRequestError } from '@shared/errors/AppError';
import { IContaDTO } from '@modules/conta/dto/IContaDTO';
import { IContaRepository } from '@modules/conta/repositories/IContaRepository';

@injectable()
export default class UpdateService {
  constructor(
    @inject('ContaRepository')
    private repository: IContaRepository,
  ) {}

  public async execute(id: string, data: IContaDTO) {
    const exist = await this.repository.findOne({
      _id: id,
    });
    if (!exist) {
      throw new BadRequestError({
        message: 'Conta não encontrada',
      });
    }
    return await this.repository.update(id, data);
  }
}
