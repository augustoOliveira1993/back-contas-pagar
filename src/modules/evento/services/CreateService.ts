import { injectable, inject } from 'tsyringe';
import { BadRequestError } from '@shared/errors/AppError';
import { IEventoDTO } from '@modules/evento/dto/IEventoDTO';
import { IEventoRepository } from '@modules/evento/repositories/IEventoRepository';
import { Evento } from '../infra/mongo/models/Evento';
import { IFileUpload } from '@shared/utils/FileUpload';

@injectable()
export default class CreateService {
  constructor(
    @inject('EventoRepository')
    private repository: IEventoRepository,
    @inject('FileUpload')
    private fileUpload: IFileUpload,
  ) {}

  public async execute(data: IEventoDTO) {
    const codigoExist = await this.repository.findOne({
      codigo: data.codigo,
    });
    if (codigoExist) {
      throw new BadRequestError({
        message: 'Código já cadastrado',
      });
    }
    const { foto, ...createdData } = data;
    let fotoFilenName: string | undefined = '';

    if (data.foto) {
      const fileInfo = await this.fileUpload.saveFile(foto, 'eventos-fotos');
      fotoFilenName = fileInfo.url;
    }

    const created = await this.repository.create({
      ...data,
      foto: fotoFilenName,
    });
    if (!created) {
      throw new BadRequestError({
        message: 'Error creating Evento',
      });
    }

    return {
      success: true,
      message: 'Evento created successfully',
      data: await this.repository.findById(created._id as string),
    };
  }
}
