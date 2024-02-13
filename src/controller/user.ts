import { Request, Response } from 'express';
import { GetUsers } from '../services/user.service';
import APIResponse from '../typedef/APIResponse';
import { HttpStatusCode } from '../utils/enums/httpStatusCodes';
import { Message } from '../utils/enums/message';

const getUsers = async (req: Request, res: Response) => {
  try {
    const getAllUsers = await GetUsers();
    const apiResponse = new APIResponse(
      String(HttpStatusCode.OK),
      getAllUsers,
      Message.Success
    );
    res.status(HttpStatusCode.OK).send(apiResponse);
  } catch (error) {
    const apiResponse = new APIResponse(
      String(HttpStatusCode.InternalServerError),
      String(error),
      'Error trying to get the users'
    );
    res.status(HttpStatusCode.InternalServerError).send(apiResponse);
  }
};

export { getUsers };
