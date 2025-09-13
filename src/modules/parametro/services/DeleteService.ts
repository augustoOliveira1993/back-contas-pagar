import { injectable, inject } from 'tsyringe';
import { BadRequestError } from '@shared/errors/AppError';
import { IParametroRepository } from '@modules/parametro/repositories/IParametroRepository';

@injectable()
export default class DeleteService {
  constructor(
    @inject('ParametroRepository')
    private repository: IParametroRepository,
  ) {}

  public async execute(id: string) {
    const deleted = await this.repository.findOne({
      _id: id,
    });
    if (!deleted) {
      throw new BadRequestError({
        message: 'Parametro não encontrada',
      });
    }

    await this.repository.delete(id);
    return {
      success: true,
      message: 'Parametro deletada com sucesso!',
      data: {
        id: deleted._id,
        codigo: deleted.key,
      },
    };
  }
}
