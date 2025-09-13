import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllService from '@modules/colaborador/services/colaborador/FindAllService';
import CreateService from '@modules/colaborador/services/colaborador/CreateService';
import DeleteService from '@modules/colaborador/services/colaborador/DeleteService';
import FindByIdService from '@modules/colaborador/services/colaborador/FindByIdService';
import UpdateService from '@modules/colaborador/services/colaborador/UpdateService';

export default class ColaboradorController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindAllService);
    const result = await service.execute(req.query);
    return res.json(result);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(CreateService);
    const result = await service.execute(
      {
        ...req.body,
        foto: req.file,
      },
      req.userEmail,
    );
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
    const result = await service.execute(
      req.params.id as string,
      { ...req.body, foto: req.file },
      req.userEmail,
    );
    return res.json(result);
  }
}
