import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllService from '@modules/evento/services/FindAllService';
import CreateService from '@modules/evento/services/CreateService';
import DeleteService from '@modules/evento/services/DeleteService';
import FindByIdService from '@modules/evento/services/FindByIdService';
import UpdateService from '@modules/evento/services/UpdateService';
import FindByKeyService from '@modules/evento/services/FindByKeyService';

export default class EventoController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindAllService);
    const result = await service.execute(req.query);
    return res.json(result);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(CreateService);
    const result = await service.execute({
      ...req.body,
      foto: req.file,
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
