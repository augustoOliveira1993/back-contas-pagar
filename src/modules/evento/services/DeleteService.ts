import { injectable, inject } from 'tsyringe';
import { BadRequestError } from '@shared/errors/AppError';
import { IEventoRepository } from '@modules/evento/repositories/IEventoRepository';

@injectable()
export default class DeleteService {
  constructor(
    @inject('EventoRepository')
    private repository: IEventoRepository,
  ) {}

  public async execute(id: string) {
    const deleted = await this.repository.findOne({
      _id: id,
    });
    if (!deleted) {
      throw new BadRequestError({
        message: 'Evento não encontrada',
      });
    }

    await this.repository.delete(id);
    return {
      success: true,
      message: 'Evento deletada com sucesso!',
      data: {
        id: deleted._id,
      },
    };
  }
}
