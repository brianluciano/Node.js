import { check } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import APIResponse from '../typedef/APIResponse';
import Item from '../entity/Item';
import { validationResult } from 'express-validator';
import { HttpStatusCode } from '../utils/enums/httpStatusCodes';

const validatorGetItem = [
  check('id').exists().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResult(req).throw();
      return next(); //TODO Continua hacia el controlador!
    } catch (err: unknown) {
      const numberResponse = new APIResponse<Item | null>(
        '403',
        null,
        'Id was not found, invalid request'
      );
      res.status(Number(numberResponse.getCode())).send(numberResponse);
    }
  }
];

const validatorCreateItem = [
  check('name').exists().notEmpty(),
  check('description').exists().notEmpty(),
  check('image').exists().notEmpty(),
  check('price').exists().notEmpty(),
  check('category.id').exists().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResult(req).throw();
      return next(); //TODO Continua hacia el controlador!
    } catch (err: unknown) {
      const numberResponse = new APIResponse(
        String(HttpStatusCode.Forbidden),
        null,
        'Mandatory fields must be filled'
      );
      res.status(HttpStatusCode.Forbidden).send(numberResponse);
    }
  }
];
export { validatorGetItem, validatorCreateItem };
