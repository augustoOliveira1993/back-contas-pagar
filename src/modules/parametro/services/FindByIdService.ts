import { injectable, inject } from 'tsyringe';
import { BadRequestError } from '@shared/errors/AppError';
import { IParametroRepository } from '@modules/parametro/repositories/IParametroRepository';

@injectable()
export default class FindByIdService {
  constructor(
    @inject('ParametroRepository')
    private repository: IParametroRepository,
  ) {}

  public async execute(id: string) {
    const roleExist = await this.repository.findOne({
      _id: id,
    });
    if (!roleExist) {
      throw new BadRequestError({
        message: 'Parametro não encontrada',
      });
    }
    return roleExist;
  }
}
