import { Request, Response } from 'express';
import { registerNewUser, loginUser } from '../services/auth.service';
import { HttpStatusCode } from '../utils/enums/httpStatusCodes';
import { matchedData } from 'express-validator';
import APIResponse from '../typedef/APIResponse';
import { errorHandleHttp } from '../utils/error.handle';
import User from '../entity/User';

const registerCtrl = async (req: Request, res: Response) => {
  try {
    let message = '';
    let statusCode = HttpStatusCode.Created;
    let data = null;
    const body = matchedData(req) as User;
    const responseUser = await registerNewUser(body);
    if (typeof responseUser === 'string') {
      statusCode = HttpStatusCode.Forbidden;
      message = String(responseUser);
    } else {
      data = responseUser;
    }
    const apiResponse = new APIResponse(String(statusCode), data, message);
    res.status(statusCode).send(apiResponse);
  } catch (error) {
    errorHandleHttp(res, null, String(error));
  }
};

const loginCtrl = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body;
    const responseUser = await loginUser(email, password);
    let message = '';
    let statusCode = HttpStatusCode.OK;
    let data = null;
    if (typeof responseUser === 'string') {
      statusCode = HttpStatusCode.Forbidden;
      message = String(responseUser);
    } else {
      data = responseUser;
    }
    const apiResponse = new APIResponse(String(statusCode), data, message);
    res.status(statusCode).send(apiResponse);
  } catch (error) {
    errorHandleHttp(res, null, String(error));
  }
};

export { loginCtrl, registerCtrl };
