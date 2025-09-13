import { injectable, inject } from 'tsyringe';
import { BadRequestError } from '@shared/errors/AppError';
import { IParametroDTO } from '@modules/parametro/dto/IParametroDTO';
import { IParametroRepository } from '@modules/parametro/repositories/IParametroRepository';
import { Parametro } from '../infra/mongo/models/Parametro';

@injectable()
export default class CreateService {
  constructor(
    @inject('ParametroRepository')
    private repository: IParametroRepository,
  ) {}

  public async execute(data: IParametroDTO) {
    const codigoExist = await this.repository.findOne({
      codigo: data.codigo,
    });
    if (codigoExist) {
      throw new BadRequestError({
        message: 'Código já cadastrado',
      });
    }
    const created = await this.repository.create(data);
    if (!created) {
      throw new BadRequestError({
        message: 'Error creating Parametro',
      });
    }

    return {
      success: true,
      message: 'Parametro created successfully',
      data: await this.repository.findById(created._id as string),
    };
  }
}
