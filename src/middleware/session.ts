import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.handle';
import APIResponse from '../typedef/APIResponse';
import { HttpStatusCode } from '../utils/enums/httpStatusCodes';

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || '';
    const jwt = jwtByUser.split(' ').pop();
    const isOk = verifyToken(`${jwt}`);
    if (!isOk) {
      const apiResponse = new APIResponse(
        String(HttpStatusCode.Unauthorized),
        null,
        'JWT not valid'
      );
      res.status(HttpStatusCode.Unauthorized).send(apiResponse);
    }
    console.log({ jwtByUser });
    next();
  } catch (error) {
    const apiResponse = new APIResponse(
      String(HttpStatusCode.BadRequest),
      null,
      'Session not valid'
    );
    res.status(HttpStatusCode.BadRequest).send(apiResponse);
  }
};

export { checkJwt };
