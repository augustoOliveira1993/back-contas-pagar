import { injectable, inject } from 'tsyringe';
import { BadRequestError } from '@shared/errors/AppError';
import { IContaDTO } from '@modules/conta/dto/IContaDTO';
import { IContaRepository } from '@modules/conta/repositories/IContaRepository';

@injectable()
export default class CreateService {
  constructor(
    @inject('ContaRepository')
    private repository: IContaRepository,
  ) {}

  public async execute(data: IContaDTO) {
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
        message: 'Error creating Conta',
      });
    }

    return {
      success: true,
      message: 'Conta created successfully',
      data: await this.repository.findById(created._id as string),
    };
  }
}
