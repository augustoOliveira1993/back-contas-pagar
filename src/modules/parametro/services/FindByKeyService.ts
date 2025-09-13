import { injectable, inject } from 'tsyringe';
import { IParametroRepository } from '@modules/parametro/repositories/IParametroRepository';

@injectable()
export default class FindByKeyService {
  constructor(
    @inject('ParametroRepository')
    private repository: IParametroRepository,
  ) {}

  public async execute(key: string) {
    let parametroKey = await this.repository.findOne({ key });
    if (!parametroKey) {
      parametroKey = await this.repository.findOne({
        key,
        value: null,
      });
    }
    return parametroKey;
  }
}
