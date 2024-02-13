import {
  getItems,
  getItem,
  postItems,
  updateItem,
  deleteItem
} from '../controller/item';
import { logMiddleware } from '../middleware/log';
import { checkJwt } from '../middleware/session';
import { validatorGetItem, validatorCreateItem } from '../validators/items';
import express from 'express';

const router = express.Router({ strict: true });

/**
 * Get all Items
 * @openapi
 * /item:
 *    get:
 *      tags:
 *        - Item
 *      summary: "List of items"
 *      description: Get a list of items
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Return a list of items
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/item'
 *        '422':
 *          description: Error de validacion.
 */
router.get('/', getItems); //checkJwt

/**
 * Get Item
 * @openapi
 * /item/getItem:
 *    get:
 *      tags:
 *        - Item
 *      summary: "Get an specific item"
 *      description: Get the detail of an specific item
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: query
 *        description: ID del item a retornar
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *      responses:
 *        '200':
 *          description: Return an object type item.
 *          content:
 *             application/json:
 *               example:
 *               id: 4812e5e5-7855-4fcc-b95d-d975f161b7a7
 *               name: Example item id
 *               schema:
 *                   $ref: '#/components/schemas/item'
 *        '422':
 *          description: Error de validacion.
 */
router.get('/getItem', validatorGetItem, getItem);

/**
 * Register new item
 * @openapi
 * /item:
 *    post:
 *      tags:
 *        - Item
 *      summary: "Register a new item"
 *      description: Register a new item and get the detail
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
 *                 $ref: "#/components/schemas/item"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con estado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post('/', validatorCreateItem, logMiddleware, postItems);

/**
 * Update item
 * @openapi
 * /item/updateItem:
 *    put:
 *      tags:
 *        - Item
 *      summary: "Update item"
 *      description: Actualiza un item y obtener el detalle del registro
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: query
 *        description: ID del item a retornar
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *          example: 156b9492-b6d1-4b81-90ff-0aeaa3ed9e19
 *      responses:
 *        '200':
 *          description: Retorna el objeto actualizado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/item"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/item'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.put('/updateItem', validatorGetItem, validatorCreateItem, updateItem);

/**
 * Delete Item
 * @openapi
 * /item/deleteItem:
 *    delete:
 *      tags:
 *        - Item
 *      summary: "Eliminar cancion"
 *      description: Elimiar el detalle de una cancion
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: query
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *          example: 156b9492-b6d1-4b81-90ff-0aeaa3ed9e19
 *      responses:
 *        '200':
 *          description: Retorna el item elminado.
 *        '422':
 *          description: Error de validacion.
 */
router.delete('/deleteItem', checkJwt, validatorGetItem, deleteItem);

export { router };
