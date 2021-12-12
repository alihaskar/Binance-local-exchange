import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { config } from '../../config';
import { Controller } from '../../controller';

@injectable()
export class ConfigController implements Controller<'getConfig'> {

  async getConfig(req: Request, res: Response) {
    return res
      .header('X-Local', 'true')
      .json(config);
  }

}
