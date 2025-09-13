import { injectable, inject } from 'tsyringe';
import { IEventoRepository } from '@modules/evento/repositories/IEventoRepository';

@injectable()
export default class FindByKeyService {
  constructor(
    @inject('EventoRepository')
    private repository: IEventoRepository,
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
