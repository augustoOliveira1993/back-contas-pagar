import { injectable, inject } from 'tsyringe';
import { BadRequestError } from '@shared/errors/AppError';
import { IContaRepository } from '@modules/conta/repositories/IContaRepository';

@injectable()
export default class DeleteService {
  constructor(
    @inject('ContaRepository')
    private repository: IContaRepository,
  ) {}

  public async execute(id: string) {
    const deleted = await this.repository.findOne({
      _id: id,
    });
    if (!deleted) {
      throw new BadRequestError({
        message: 'Conta não encontrada',
      });
    }

    await this.repository.delete(id);
    return {
      success: true,
      message: 'Conta deletada com sucesso!',
      data: {
        id: deleted._id,
      },
    };
  }
}
