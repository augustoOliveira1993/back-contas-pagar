import { injectable, inject } from 'tsyringe';
import { BadRequestError } from '@shared/errors/AppError';
import { IEventoDTO } from '@modules/evento/dto/IEventoDTO';
import { IEventoRepository } from '@modules/evento/repositories/IEventoRepository';
import { IFileUpload } from '@shared/utils/FileUpload';

@injectable()
export default class UpdateService {
  constructor(
    @inject('EventoRepository')
    private repository: IEventoRepository,
    @inject('FileUpload')
    private fileUpload: IFileUpload,
  ) {}

  public async execute(id: string, data: IEventoDTO) {
    const exist = await this.repository.findOne({
      _id: id,
    });
    if (!exist) {
      throw new BadRequestError({
        message: 'Evento não encontrada',
      });
    }
    let fotoUrl: string | undefined = '';
    let { foto, ...restUpdate }: any = data;
    if (foto) {
      if (exist.foto) {
        await this.fileUpload.deleteFileFromUrl(exist.foto, 'eventos-fotos');
      }
      const fileInfo = await this.fileUpload.saveFile(foto, 'eventos-fotos');
      fotoUrl = fileInfo.url;
    }
    return await this.repository.update(id, { ...restUpdate, foto: fotoUrl });
  }
}
