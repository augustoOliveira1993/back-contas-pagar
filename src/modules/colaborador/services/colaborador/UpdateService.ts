import { injectable, inject } from 'tsyringe';
import { NotFoundError } from '@shared/errors/AppError';
import IColaboradorRepository from '@modules/colaborador/repositories/IColaboradorRepository';
import { IColaboradorDTO } from '@modules/colaborador/dto/IColaboradorDTO';
import { IFileUpload } from '@shared/utils/FileUpload';

@injectable()
export default class UpdateService {
  constructor(
    @inject('ColaboradorRepository')
    private repository: IColaboradorRepository,
    @inject('FileUpload')
    private fileUpload: IFileUpload,
  ) {}

  public async execute(
    idColaborador: string,
    data: IColaboradorDTO,
    userEmail: string | undefined,
  ) {
    const exist = await this.repository.findById(idColaborador);
    if (!exist) {
      throw new NotFoundError({ message: 'Colaborador não encontrada' });
    }
    let fotoUrl: string | undefined = '';
    let { foto, ...restUpdate }: any = data;
    if (foto) {
      if (exist.foto) {
        await this.fileUpload.deleteFileFromUrl(exist.foto, 'colaborador-foto');
      }
      const fileInfo = await this.fileUpload.saveFile(foto, 'colaborador-foto');
      fotoUrl = fileInfo.url;
    }

    const updateColaborador = await this.repository.update(idColaborador, {
      ...restUpdate,
      foto: fotoUrl,
      updated_by: userEmail,
    });
    return updateColaborador;
  }
}
