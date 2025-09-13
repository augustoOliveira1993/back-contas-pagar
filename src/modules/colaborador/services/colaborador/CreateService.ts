import uploadConfig from '@config/upload';
import { IColaboradorDocument } from '@modules/colaborador/dto/IColaboradorDTO';
import IColaboradorRepository from '@modules/colaborador/repositories/IColaboradorRepository';
import moment from 'moment-timezone';
import { injectable, inject } from 'tsyringe';
import { randomBytes } from 'crypto';
import path from 'path';
import fs from 'fs';
import { IFileUpload } from '@shared/utils/FileUpload';
moment.locale('pt-br');

@injectable()
class CreateService {
  constructor(
    @inject('ColaboradorRepository')
    private repository: IColaboradorRepository,
    @inject('FileUpload')
    private fileUpload: IFileUpload,
  ) {}

  public async execute(
    data: IColaboradorDocument,
    userEmail: string | undefined,
  ) {
    const { foto, ...createdData } = data;
    let fotoFilenName: string | undefined = '';

    if (data.foto) {
      const fileInfo = await this.fileUpload.saveFile(foto, 'colaborador-foto');
      fotoFilenName = fileInfo.url;
    }
    const created = await this.repository.create({
      ...createdData,
      foto: fotoFilenName,
      created_by: userEmail,
    });
    return {
      success: true,
      message: 'Colaborador criada com sucesso!',
      data: created,
    };
  }
}

export default CreateService;
