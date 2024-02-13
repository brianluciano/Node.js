import { Router } from 'express';
import {
  getCategories,
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory
} from '../controller/category';
import { logMiddleware } from '../middleware/log';
import { checkJwt } from '../middleware/session';
import {
  validatorCreateCategory,
  validatorGetCategory
} from '../validators/category';

const router = Router();

/**
 * Get all Categories
 * @openapi
 * /category:
 *    get:
 *      tags:
 *        - Category
 *      summary: "List of categories"
 *      description: Get a list of categories
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Return a list of categories
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/category'
 *        '422':
 *          description: Error de validacion.
 */
router.get('/', checkJwt, getCategories);

/**
 * Get Category
 * @openapi
 * /category/getCategory:
 *    get:
 *      tags:
 *        - Category
 *      summary: "Get an specific category"
 *      description: Get the detail of an specific category
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: query
 *        description: ID de la categoria a retornar
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      responses:
 *        '200':
 *          description: Return an object type category.
 *          content:
 *             application/json:
 *               example:
 *               id: 4812e5e5-7855-4fcc-b95d-d975f161b7a7
 *               name: Example category id
 *               schema:
 *                   $ref: '#/components/schemas/category'
 *        '422':
 *          description: Error de validacion.
 */
router.get('/getCategory', validatorGetCategory, logMiddleware, getCategory);

/**
 * Register new category
 * @openapi
 * /category:
 *    post:
 *      tags:
 *        - Category
 *      summary: "Register a new category"
 *      description: Register a new category and get the detail
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Return the object that has been added
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/category"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post('/', validatorCreateCategory, postCategory);

router.put(
  '/updateCategory',
  validatorGetCategory,
  validatorCreateCategory,
  updateCategory
);

router.delete('/deleteCategory', validatorGetCategory, deleteCategory);

export { router };
