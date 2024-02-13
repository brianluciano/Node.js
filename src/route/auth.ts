import { loginCtrl, registerCtrl } from '../controller/auth';
import express from 'express';
import { validatorLoginUser, validatorRegisterUser } from '../validators/user';

const router = express.Router();

/**
 * http://localhost:3001/api
 *
 * Route register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - Auth
 *          summary: "Register a new user"
 *          description: "This is the route to register a new user"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *              '201':
 *                  description: "User register in a wrong way"
 *              '403':
 *                  description: "Error validate user"
 *
 *
 */
router.post('/register', validatorRegisterUser, registerCtrl);

/**
 * http://localhost:3001/api
 *
 * Route login new user
 * @openapi
 * /auth/login:
 *      post:
 *          tags:
 *              - Auth
 *          summary: "User Login"
 *          description: "This is the route to login a new user"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authLogin"
 *          responses:
 *              '201':
 *                  description: "User login in a wrong"
 *              '403':
 *                  description: "Error validate user"
 *
 *
 */
router.post('/login', validatorLoginUser, loginCtrl);

export { router };
