import { CreateUrlDto } from '@user-service/dtos/create-url.dto';
import { UrlService } from '@user-service/services/url.service';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const urlData: CreateUrlDto = req.body;
      const userId = req.user!.id;

      const url = await this.urlService.createShortUrl(urlData, userId);

      // return
      res.status(StatusCodes.CREATED).json({
        data: url,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getByShortCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { shortCode } = req.params;

      const url = await this.urlService.getUrlByShortCode(shortCode);

      res.status(StatusCodes.OK).json({
        data: url,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getUrlsByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.urlService.getUrlsByUserId(userId, page, limit);

      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async deleteUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await this.urlService.deleteUrlById(id);

      res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  }

  public async redirectToOriginalUrl(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { shortCode } = req.params;

      const url = await this.urlService.incrementClickCount(shortCode);

      res.redirect(url.originalUrl);
    } catch (error) {
      next(error);
    }
  }
}

export const createUrlController = (urlService: UrlService) =>
  new UrlController(urlService);
