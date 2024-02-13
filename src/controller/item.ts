import Item from '../entity/Item';
import { Request, Response } from 'express';
import APIResponse from '../typedef/APIResponse';
import checkIdExists from '../utils/checkIdExist';
import { HttpStatusCode } from '../utils/enums/httpStatusCodes';
import { Message } from '../utils/enums/message';

import {
  GetItems,
  GetItem,
  CreateItem,
  UpdateItem,
  DeleteItem
} from '../services/item.service';
import { matchedData } from 'express-validator';

const getItem = async (req: Request, res: Response) => {
  try {
    const id = String(req.query.id);
    let item = null;
    let statusCode = HttpStatusCode.OK;
    let message = Message.Success;

    const idExist = await checkIdExists('Item', id);
    if (idExist) {
      item = await GetItem(id);
    } else {
      statusCode = HttpStatusCode.NotFound;
      message = Message.NoResults;
    }
    const apiResponse = new APIResponse(String(statusCode), item, message);
    res.status(statusCode).send(apiResponse);
  } catch (error) {
    const apiResponse = new APIResponse(
      String(HttpStatusCode.InternalServerError),
      null,
      'Error trying to get the item'
    );
    res.status(HttpStatusCode.InternalServerError).send(apiResponse);
  }
};

const getItems = async (req: Request, res: Response) => {
  try {
    const getAllItems = await GetItems();
    const apiResponse = new APIResponse(
      String(HttpStatusCode.OK),
      getAllItems,
      Message.Success
    );
    res.status(HttpStatusCode.OK).send(apiResponse);
  } catch (error) {
    const apiResponse = new APIResponse(
      String(HttpStatusCode.InternalServerError),
      null,
      'Error trying to get the items'
    );
    res.status(HttpStatusCode.InternalServerError).send(apiResponse);
  }
};

const postItems = async (req: Request, res: Response) => {
  try {
    const body = matchedData(req) as Item;
    const newItem = await CreateItem(body);
    const numberResponse = new APIResponse(
      String(HttpStatusCode.Created),
      newItem,
      'Resource created'
    );
    res.status(HttpStatusCode.Created).send(numberResponse);
  } catch (error) {
    const apiResponse = new APIResponse(
      String(HttpStatusCode.InternalServerError),
      null,
      'Error , cannot create the item'
    );
    res.status(HttpStatusCode.InternalServerError).send(apiResponse);
  }
};

const updateItem = async (req: Request, res: Response) => {
  try {
    const body = matchedData(req) as Item;
    const updateItem = await UpdateItem(body);
    const numberResponse = new APIResponse(
      String(HttpStatusCode.OK),
      updateItem,
      'Resource updated successfully'
    );
    res.status(HttpStatusCode.OK).send(numberResponse);
  } catch (error) {
    const apiResponse = new APIResponse(
      String(HttpStatusCode.InternalServerError),
      null,
      'Error trying to update the item'
    );
    res.status(HttpStatusCode.InternalServerError).send(apiResponse);
  }
};

const deleteItem = async (req: Request, res: Response) => {
  try {
    const id = String(req.query.id);
    let getItem = null;
    let statusCode = HttpStatusCode.OK;
    let message = Message.Deleted;
    const idExist = await checkIdExists('Item', id);
    if (idExist) {
      getItem = await GetItem(id);
      await DeleteItem(id);
    } else {
      statusCode = HttpStatusCode.NotFound;
      message = Message.NoResults;
    }
    const apiResponse = new APIResponse(String(statusCode), getItem, message);
    res.status(statusCode).send(apiResponse);
  } catch (error) {
    const apiResponse = new APIResponse(
      String(HttpStatusCode.InternalServerError),
      null,
      'Error trying to delete the item'
    );
    res.status(HttpStatusCode.InternalServerError).send(apiResponse);
  }
};

export { getItems, getItem, postItems, updateItem, deleteItem };
