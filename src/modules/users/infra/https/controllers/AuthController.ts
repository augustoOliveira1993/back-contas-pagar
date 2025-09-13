import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import BlocksRepository from '@modules/users/infra/mongo/repositories/BlocksRepository';
import UsersRepository from '@modules/users/infra/mongo/repositories/UsersRepository';

import CreateUserService from '@modules/users/services/user/CreateUserService';
import BlockService from '@modules/users/services/block/BlockUser';
import AuthService from '@modules/users/services/auth/AuthenticateUser';
import GetInfoUserAuthService from '@modules/users/services/auth/GetMeAuthService';
import { logger } from '@shared/utils/logger';
import GetAbilityUserAuthService from '@modules/users/services/auth/GetAbilityAuthService';
import RefreshTokenService from '@modules/users/services/user/RefreshTokenService';

const authConfig = {
  url: process.env.AD_URL!,
  baseDN: process.env.DOMAIN_CONTROLLER!,
};

const userRepository = new UsersRepository();
const blockRepository = new BlocksRepository();
const blockService = new BlockService(blockRepository);
const authService = new AuthService(
  userRepository,
  blockService,
  blockRepository,
  authConfig,
);

export default class AuthController {
  public async signup(req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute(req.body);
    return res.status(200).json(user);
  }

  public async signin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    let ipRequest =
      req.ip?.split(':').length === 3 ? 'local' : req.ip?.split(':')[3];
    const { blocked, minutesLeft } = await blockService.isBlocked(email);
    if (blocked) {
      res.status(401).send({
        message: `Usuário Bloqueado. Aguarde ${minutesLeft} minuto(s) to expire.`,
      });
      return;
    }
    const authResponse = await authService
      .authenticate(email, password)
      .then((resp: any) => {
        logger.info(`[${ipRequest}] Usuário ${email} autenticado com sucesso!`);
        return resp;
      });
    res.status(200).json(authResponse);
  }

  public async getUserAuth(req: Request, res: Response) {
    const service = container.resolve(GetInfoUserAuthService);
    const result = await service.execute(req.userId as string);
    return res.status(200).json(result);
  }

  public async refreshToken(req: Request, res: Response) {
    const service = container.resolve(RefreshTokenService);
    const result = await service.execute(req.body.refreshToken as string);
    return res.status(200).json(result);
  }
  public async getAbilityAuth(req: Request, res: Response) {
    const service = container.resolve(GetAbilityUserAuthService);
    const result = await service.execute(req.userId as string);
    return res.status(200).json(result);
  }

  public async getAbilityUserAuth(req: Request, res: Response) {
    const service = container.resolve(GetAbilityUserAuthService);
    const result = await service.execute(req.userId as string);
    return res.status(200).json(result);
  }
}
