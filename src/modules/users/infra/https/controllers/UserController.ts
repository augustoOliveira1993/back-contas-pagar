import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/user/CreateUserService';
import UpdateUserService from '@modules/users/services/user/UpdateUserService';
import AddPermissionsByUserIdService from '@modules/users/services/user/AddPermissionByUserId.service';
import FindAllService from '@modules/users/services/user/FindAllService';
import AddRoleByUserIdService from '@modules/users/services/user/AddRoleByUserId.service';
import FindByIdService from '@modules/users/services/user/FindByIdService';
import GetInfoUserAuthService from '@modules/users/services/auth/GetMeAuthService';
import DeleteServiceService from '@modules/users/services/user/DeleteService';
import RemovePermissionByUserIdService from '@modules/users/services/user/RemovePermissionByUserIdService';
import RemoveRolesByUserIdService from '@modules/users/services/user/RemoveRolesByUserIdService';

export default class UsersController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindAllService);
    const users = await service.execute(req.query);
    return res.json(users);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindByIdService);
    const result = await service.execute(req.params.id);
    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const userData = req.body;
    try {
      const editUserService = container.resolve(UpdateUserService);
      userData.lastupdate = new Date().toLocaleString();
      const updatedUser = await editUserService.editUser(
        userData._id,
        userData,
      );
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ error: 'Erro em atualizar usuário' });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const userData = req.body;
    const { id } = req.params;
    const editUserService = container.resolve(UpdateUserService);
    const updatedUser = await editUserService.editUser(id, userData);
    return res.status(200).json(updatedUser);
  }

  public async addPermissionByUserId(req: Request, res: Response) {
    const service = container.resolve(AddPermissionsByUserIdService);
    const result = await service.execute(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async removePermissionByUserId(req: Request, res: Response) {
    const service = container.resolve(RemovePermissionByUserIdService);
    const result = await service.execute(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async addRolesByUserId(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const service = container.resolve(AddRoleByUserIdService);
    const result = await service.execute(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async removerRolesByUserId(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const service = container.resolve(RemoveRolesByUserIdService);
    const result = await service.execute(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async getUserAuth(req: Request, res: Response) {
    const service = container.resolve(GetInfoUserAuthService);
    const result = await service.execute(req.userId as string);
    return res.status(200).json(result);
  }

  public async create(req: Request, res: Response) {
    const service = container.resolve(CreateUserService);
    const result = await service.execute(req.body);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response) {
    const service = container.resolve(DeleteServiceService);
    const result = await service.execute(req.params.id);
    return res.status(200).json(result);
  }
}
