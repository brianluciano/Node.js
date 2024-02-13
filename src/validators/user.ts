import { check } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import APIResponse from '../typedef/APIResponse';
import { validationResult } from 'express-validator';
import { HttpStatusCode } from '../utils/enums/httpStatusCodes';

const validatorRegisterUser = [
  check('name').exists().notEmpty(),
  check('lastName').exists().notEmpty(),
  check('email').exists().notEmpty(),
  check('password').exists().notEmpty(),
  check('age').exists().notEmpty(),
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

const validatorLoginUser = [
  check('email').exists().notEmpty(),
  check('password').exists().notEmpty(),
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

export { validatorRegisterUser, validatorLoginUser };
