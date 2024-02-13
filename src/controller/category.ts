import { Request, Response } from 'express';
import APIResponse from '../typedef/APIResponse';
import checkIdExists from '../utils/checkIdExist';
import { matchedData } from 'express-validator';
import { HttpStatusCode } from '../utils/enums/httpStatusCodes';
import { Message } from '../utils/enums/message';
import Category from '../entity/Category';

import {
  GetCategory,
  GetCategories,
  CreateCategory,
  UpdateCategory,
  DeleteCategory
} from '../services/category.service';

const getCategory = async (req: Request, res: Response) => {
  try {
    const id = String(req.query.id);
    let category = null;
    let statusCode = HttpStatusCode.OK;
    let message = Message.Success;

    const idExist = await checkIdExists('Category', id);
    if (idExist) {
      category = await GetCategory(id);
    } else {
      statusCode = HttpStatusCode.NotFound;
      message = Message.NoResults;
    }
    const apiResponse = new APIResponse(String(statusCode), category, message);
    res.status(statusCode).send(apiResponse);
  } catch (error) {
    const apiResponse = new APIResponse(
      String(HttpStatusCode.InternalServerError),
      String(error),
      'Error trying to get the category'
    );
    res.status(HttpStatusCode.InternalServerError).send(apiResponse);
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const getAllCategories = await GetCategories();
    const apiResponse = new APIResponse(
      String(HttpStatusCode.OK),
      getAllCategories,
      Message.Success
    );
    res.status(HttpStatusCode.OK).send(apiResponse);
  } catch (error) {
    const apiResponse = new APIResponse(
      String(HttpStatusCode.InternalServerError),
      String(error),
      'Error trying to get the categories'
    );
    res.status(HttpStatusCode.InternalServerError).send(apiResponse);
  }
};

const postCategory = async (req: Request, res: Response) => {
  try {
    const body = matchedData(req) as Category;
    const newCategory = await CreateCategory(body);
    const numberResponse = new APIResponse(
      String(HttpStatusCode.Created),
      newCategory,
      'Resource created'
    );
    res.status(HttpStatusCode.Created).send(numberResponse);
  } catch (error) {
    const apiResponse = new APIResponse(
      String(HttpStatusCode.InternalServerError),
      String(error),
      'Error trying to create the categories'
    );
    res.status(HttpStatusCode.InternalServerError).send(apiResponse);
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const body = matchedData(req) as Category;
    const updateCategory = await UpdateCategory(body.id, body);
    const numberResponse = new APIResponse(
      String(HttpStatusCode.OK),
      updateCategory,
      'Resource updated successfully'
    );
    res.status(HttpStatusCode.OK).send(numberResponse);
  } catch (error) {
    const apiResponse = new APIResponse(
      String(HttpStatusCode.InternalServerError),
      String(error),
      'Error trying to update the category'
    );
    res.status(HttpStatusCode.InternalServerError).send(apiResponse);
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = String(req.query.id);
    let getCategory = null;
    let statusCode = HttpStatusCode.OK;
    let message = Message.Deleted;
    const idExist = await checkIdExists('Category', id);
    if (idExist) {
      getCategory = await GetCategory(id);
      await DeleteCategory(id);
    } else {
      statusCode = HttpStatusCode.NotFound;
      message = Message.NoResults;
    }
    const apiResponse = new APIResponse(
      String(statusCode),
      getCategory,
      message
    );
    res.status(statusCode).send(apiResponse);
  } catch (error) {
    const apiResponse = new APIResponse(
      String(HttpStatusCode.InternalServerError),
      String(error),
      'Error trying to delete the category'
    );
    res.status(HttpStatusCode.InternalServerError).send(apiResponse);
  }
};

export {
  getCategories,
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory
};
