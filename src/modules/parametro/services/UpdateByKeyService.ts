import { injectable, inject } from 'tsyringe';
import { IParametroDTO } from '@modules/parametro/dto/IParametroDTO';
import { IParametroRepository } from '@modules/parametro/repositories/IParametroRepository';

@injectable()
export default class UpdateByKeyService {
  constructor(
    @inject('ParametroRepository')
    private repository: IParametroRepository,
  ) {}

  public async execute(key: string, data: IParametroDTO) {
    let parametroKey = await this.repository.findOne({
      key,
    });
    if (!parametroKey) {
      parametroKey = await this.repository.create({
        key,
      });
    }
    return await this.repository.update(parametroKey._id as string, data);
  }
}
