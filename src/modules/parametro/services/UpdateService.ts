import { injectable, inject } from 'tsyringe';
import { BadRequestError } from '@shared/errors/AppError';
import { IParametroDTO } from '@modules/parametro/dto/IParametroDTO';
import { IParametroRepository } from '@modules/parametro/repositories/IParametroRepository';

@injectable()
export default class UpdateService {
  constructor(
    @inject('ParametroRepository')
    private repository: IParametroRepository,
  ) {}

  public async execute(id: string, data: IParametroDTO) {
    const fornecedorExist = await this.repository.findOne({
      _id: id,
    });
    if (!fornecedorExist) {
      throw new BadRequestError({
        message: 'Parametro não encontrada',
      });
    }
    return await this.repository.update(id, data);
  }
}
