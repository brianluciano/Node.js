import { check } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import APIResponse from '../typedef/APIResponse';
import Category from '../entity/Category';
import { validationResult } from 'express-validator';

const validatorGetCategory = [
  check('id').exists().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResult(req).throw();
      return next(); //TODO Continua hacia el controlador!
    } catch (err: unknown) {
      const numberResponse = new APIResponse<Category | null>(
        '403',
        null,
        'Id was not found, invalid request'
      );
      res.status(Number(numberResponse.getCode())).send(numberResponse);
    }
  }
];

const validatorCreateCategory = [
  check('name').exists().notEmpty(),
  check('description').exists().notEmpty(),
  check('image').exists().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResult(req).throw();
      return next(); //TODO Continua hacia el controlador!
    } catch (err: unknown) {
      const numberResponse = new APIResponse<Category | null>(
        '403',
        null,
        'Mandatory fields must be filled'
      );
      res.status(Number(numberResponse.getCode())).send(numberResponse);
    }
  }
];
export { validatorGetCategory, validatorCreateCategory };
