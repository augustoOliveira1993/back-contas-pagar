import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllService from '@modules/conta/services/FindAllService';
import CreateService from '@modules/conta/services/CreateService';
import DeleteService from '@modules/conta/services/DeleteService';
import FindByIdService from '@modules/conta/services/FindByIdService';
import UpdateService from '@modules/conta/services/UpdateService';
import FindByKeyService from '@modules/conta/services/FindByKeyService';

export default class ContaController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindAllService);
    const result = await service.execute({ ...req.query, user: req.userId });
    return res.json(result);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(CreateService);
    const result = await service.execute({
      ...req.body,
      user: req.userId,
      created_by: req.userEmail,
    });

    return res.json(result);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(DeleteService);
    const result = await service.execute(req.params.id as string);
    return res.json(result);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindByIdService);
    const result = await service.execute(req.params.id as string);
    return res.json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(UpdateService);
    const result = await service.execute(req.params.id as string, {
      ...req.body,
      foto: req.file,
      updated_by: req.userEmail,
    });
    return res.json(result);
  }

  public async findByKey(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindByKeyService);
    const result = await service.execute(req.params.key as string);
    return res.json(result);
  }
}
