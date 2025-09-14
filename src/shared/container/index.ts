import { container } from 'tsyringe';
import { ExternalSocketManager } from '@shared/socket/ExternalSocketClient';

import FileUpload from '@shared/utils/FileUpload';
import '@modules/log/container';
import '@modules/users/container';
import '@modules/notification/container';
import '@modules/parametro/container';
import '@modules/conta/container';

container.registerSingleton<FileUpload>('FileUpload', FileUpload);

// Registro opcional (já funciona com @singleton)
container.registerSingleton<ExternalSocketManager>(
  'ExternalSocketManager',
  ExternalSocketManager,
);
