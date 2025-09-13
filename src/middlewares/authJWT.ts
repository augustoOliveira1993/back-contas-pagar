import { Request, Response, NextFunction } from 'express';
import config from '@config/auth.config';
import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '@shared/errors/AppError';
import { User } from '@modules/users/infra/mongo/models/User';
import moment from 'moment-timezone';

interface DecodedToken {
  id: string;
  email: string;
  is_admin: boolean;
  iat?: number;
  exp?: number;
}
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let token = req.headers['x-access-token'] as string;

    if (!token) {
      throw new UnauthorizedError({
        message: 'Nenhum token fornecido',
        title: 'Falha na autenticação!',
      });
    }

    if (!config.secret) {
      throw new UnauthorizedError({
        message: 'Token chave de autenticação não definida',
        title: 'Falha na autenticação!',
      });
    }

    // Verificação síncrona do token
    const decoded = jwt.verify(token, config.secret) as DecodedToken;

    req.userId = decoded.id;
    req.userEmail = decoded.email;
    req.is_admin = decoded.is_admin;

    const userToken = await User.findOne({ _id: decoded.id });
    if (!userToken) {
      throw new UnauthorizedError({
        message: 'Usuário não encontrado',
        title: 'Falha na autenticação!',
      });
    }

    next();
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      error.name === 'JsonWebTokenError'
    ) {
      return next(
        new UnauthorizedError({
          message: 'Token inválido!',
          title: 'Falha na autenticação!',
        }),
      );
    }

    if (
      error &&
      typeof error === 'object' &&
      error.name === 'TokenExpiredError'
    ) {
      return next(
        new UnauthorizedError({
          message: `Token expirado ás ${moment(error.expiredAt).format(
            'DD/MM/YYYY HH:mm:ss',
          )}`,
          title: 'Falha na autenticação!',
        }),
      );
    }

    if (error && typeof error === 'object' && error.name === 'NotBeforeError') {
      return next(
        new UnauthorizedError({
          message: 'Token ainda nao pode ser utilizado!',
          title: 'Falha na autenticação!',
        }),
      );
    }

    next(error);
  }
};

export const generateToken = (
  payload: any,
  noExpiration: boolean = false,
): string => {
  if (!config.secret) {
    throw new UnauthorizedError({
      message: 'Token chave de autenticação não definida',
      title: 'Falha na autenticação!',
    });
  }
  const options: jwt.SignOptions = noExpiration
    ? {}
    : { expiresIn: payload.expire_at };

  return jwt.sign(payload, config.secret, options);
};

export const generateRefreshToken = (
  payload: any,
  noExpiration: boolean = false,
): string => {
  if (!config.refreshSecret) {
    throw new UnauthorizedError({
      message: 'Refresh token chave de autenticação não definida',
      title: 'Falha na autenticação!',
    });
  }

  const options: jwt.SignOptions = noExpiration
    ? {}
    : {
        expiresIn: payload?.expire_at
          ? `${Number(payload?.expire_at?.slice(0, -1)) + 1}${payload?.expire_at?.slice(-1)}`
          : config.expiresInRefreshToken,
      };

  return jwt.sign(payload, config.refreshSecret, options);
};

const authJwt = {
  verifyToken,
  generateToken,
  generateRefreshToken,
};

export default authJwt;
