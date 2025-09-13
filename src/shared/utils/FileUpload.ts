import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import uploadConfig from '@config/upload';

export interface IFileUpload {
  saveFile(
    file: Express.Multer.File,
    subfolder?: string,
  ): Promise<{
    fileName: string;
    filePath: string;
    url: string;
  }>;

  deleteFile(fileName: string, subfolder?: string): Promise<void>;

  deleteFileFromUrl(fileUrl: string, subfolder?: string): Promise<void>;

  getFileUrl(fileName: string, subfolder?: string): string;

  extractFileNameFromUrl(url: string): string;

  ensureDirectoryExists(directoryPath: string): void;
}

class FileUpload implements IFileUpload {
  /**
   * Salva um arquivo em um subdiretório específico
   * @param file - Arquivo Multer
   * @param subfolder - Subpasta dentro do diretório tmp (ex: 'colaborador-foto')
   * @returns Informações do arquivo salvo
   */
  public async saveFile(
    file: Express.Multer.File,
    subfolder?: string,
  ): Promise<{
    fileName: string;
    filePath: string;
    url: string;
  }> {
    // Gera nome único para o arquivo
    const fileHash = crypto.randomBytes(10).toString('hex');
    const cleanFileName = file.originalname.replace(/\s/g, '+');
    const fileName = `${fileHash}-${cleanFileName}`;

    // Define o caminho de destino
    const baseDestination = subfolder
      ? path.join(uploadConfig.directory, subfolder)
      : uploadConfig.directory;

    // Garante que o diretório existe
    this.ensureDirectoryExists(baseDestination);

    const destinationPath = path.join(baseDestination, fileName);

    // Salva o arquivo
    fs.writeFileSync(destinationPath, file.buffer);

    // Retorna informações do arquivo
    return {
      fileName,
      filePath: destinationPath,
      url: this.getFileUrl(fileName, subfolder),
    };
  }

  /**
   * Deleta um arquivo de forma segura (não lança erro se o arquivo não existir)
   * @param fileName - Nome do arquivo
   * @param subfolder - Subpasta dentro do diretório tmp
   */
  public async deleteFile(fileName: string, subfolder?: string): Promise<void> {
    const basePath = subfolder
      ? path.join(uploadConfig.directory, subfolder)
      : uploadConfig.directory;

    const filePath = path.join(basePath, fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Arquivo deletado: ${filePath}`);
    }
  }
  /**
   * Gera a URL de acesso ao arquivo
   * @param fileName - Nome do arquivo
   * @param subfolder - Subpasta dentro do diretório tmp
   * @returns URL completa para acesso ao arquivo
   */
  public getFileUrl(fileName: string, subfolder?: string): string {
    if (subfolder) {
      return `/${subfolder}/${fileName}`;
    }

    return `/${fileName}`;
  }

  /**
   * Garante que o diretório existe, criando se necessário
   * @param directoryPath - Caminho do diretório
   */
  public ensureDirectoryExists(directoryPath: string): void {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
  }

  /**
   * Move um arquivo temporário para um subdiretório específico
   * @param tempFilePath - Caminho do arquivo temporário
   * @param subfolder - Subpasta de destino
   * @returns Informações do arquivo movido
   */
  public async moveFile(
    tempFilePath: string,
    subfolder: string,
  ): Promise<{
    fileName: string;
    filePath: string;
    url: string;
  }> {
    if (!fs.existsSync(tempFilePath)) {
      throw new Error('Arquivo temporário não encontrado');
    }

    const fileName = path.basename(tempFilePath);
    const baseDestination = path.join(uploadConfig.directory, subfolder);

    this.ensureDirectoryExists(baseDestination);

    const destinationPath = path.join(baseDestination, fileName);

    // Move o arquivo
    fs.renameSync(tempFilePath, destinationPath);

    return {
      fileName,
      filePath: destinationPath,
      url: this.getFileUrl(fileName, subfolder),
    };
  }

  /**
   * Deleta um arquivo a partir de uma URL
   * @param fileUrl - URL completa do arquivo
   * @param subfolder - Subpasta onde o arquivo está salvo
   */
  public async deleteFileFromUrl(
    fileUrl: string,
    subfolder?: string,
  ): Promise<void> {
    const fileName = this.extractFileNameFromUrl(fileUrl);
    if (fileName) {
      await this.deleteFile(fileName, subfolder);
    }
  }

  /**
   * Extrai o nome do arquivo de uma URL ou caminho
   * @param url - URL ou caminho do arquivo
   * @returns Nome do arquivo ou string vazia se não encontrado
   */
  public extractFileNameFromUrl(url: string): string {
    if (!url || typeof url !== 'string') {
      return '';
    }

    // Remove parâmetros de query se houver
    const cleanUrl = url.split('?')[0];

    // Remove fragmentos se houver
    const withoutFragment = cleanUrl.split('#')[0];

    // Extrai o nome do arquivo da URL
    const parts = withoutFragment.split('/');
    const fileName = parts[parts.length - 1] || '';

    // Verifica se é um nome de arquivo válido (com extensão)
    if (fileName && fileName.includes('.')) {
      return fileName;
    }

    return '';
  }
}

export default FileUpload;
