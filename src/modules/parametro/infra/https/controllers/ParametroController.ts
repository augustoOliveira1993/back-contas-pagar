import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllService from '@modules/parametro/services/FindAllService';
import CreateService from '@modules/parametro/services/CreateService';
import DeleteService from '@modules/parametro/services/DeleteService';
import FindByIdService from '@modules/parametro/services/FindByIdService';
import UpdateService from '@modules/parametro/services/UpdateService';
import FindByKeyService from '@modules/parametro/services/FindByKeyService';
import UpdateByKeyService from '@modules/parametro/services/UpdateByKeyService';

export default class ParametroController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindAllService);
    const result = await service.execute(req.query);
    return res.json(result);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(CreateService);
    const result = await service.execute({
      ...req.body,
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
      updated_by: req.userEmail,
    });
    return res.json(result);
  }

  public async findByKey(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindByKeyService);
    const result = await service.execute(req.params.key as string);
    return res.json(result);
  }

  public async updateByKey(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(UpdateByKeyService);
    const result = await service.execute(req.params.key as string, {
      ...req.body,
      updated_by: req.userEmail,
    });
    return res.json(result);
  }
}
