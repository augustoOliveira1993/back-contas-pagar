import { Request, Response, NextFunction } from 'express';
import { User } from '@modules/users/infra/mongo/models/User';
import { BadRequestError } from '@shared/errors/AppError';

interface IReqBody {
  form: {
    username: string;
    email: string;
  };
  roles?: string[];
}

const ROLES = ['user', 'admin', 'moderator'];

export const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userByUsername = await User.findOne({
    username: req.body.username,
  }).exec();
  if (userByUsername) {
    throw new BadRequestError({
      message: 'Já existe um usuário com esse username',
      title: 'Falha ao cadastrar o usuário',
    });
  }

  const userByEmail = await User.findOne({
    email: req.body.email,
  }).exec();
  if (userByEmail) {
    throw new BadRequestError({
      message: 'Já existe um usuário com esse email',
      title: 'Falha ao cadastrar o usuário',
    });
  }
  next();
};

export const checkRolesExisted = (
  req: Request<{}, {}, IReqBody>,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.body);
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

export default verifySignUp;
