import { Response } from 'express';
import APIResponse from '../typedef/APIResponse';
import { HttpStatusCode } from './enums/httpStatusCodes';

const errorHandleHttp = (
  res: Response,
  error: unknown,
  customMessage: string
) => {
  const apiResponse = new APIResponse(
    String(HttpStatusCode.InternalServerError),
    String(error),
    customMessage
  );
  res.status(HttpStatusCode.InternalServerError).send(apiResponse);
};

export { errorHandleHttp };
