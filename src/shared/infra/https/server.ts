import { SocketManager } from '@shared/socket/SocketManager';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppServer, IHttpsServerOption } from './app';
import { logger } from '@shared/utils/logger';

dotenv.config();

const app = new AppServer();
const portServer = process.env.PORT;

SocketManager.getInstance().initialize(app.httpServer);

app.httpServer.listen(portServer, () => {
  logger.info(`🚀 API Base TS online ${process.env.APP_WEB_URL}:${portServer}`);
});
