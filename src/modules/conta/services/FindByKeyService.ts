import { injectable, inject } from 'tsyringe';
import { IContaRepository } from '@modules/conta/repositories/IContaRepository';

@injectable()
export default class FindByKeyService {
  constructor(
    @inject('ContaRepository')
    private repository: IContaRepository,
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
