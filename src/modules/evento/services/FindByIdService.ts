import { injectable, inject } from 'tsyringe';
import { BadRequestError } from '@shared/errors/AppError';
import { IEventoRepository } from '@modules/evento/repositories/IEventoRepository';

@injectable()
export default class FindByIdService {
  constructor(
    @inject('EventoRepository')
    private repository: IEventoRepository,
  ) {}

  public async execute(id: string) {
    const roleExist = await this.repository.findOne({
      _id: id,
    });
    if (!roleExist) {
      throw new BadRequestError({
        message: 'Evento não encontrada',
      });
    }
    return roleExist;
  }
}
