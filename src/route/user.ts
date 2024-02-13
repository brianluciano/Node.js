import { Router } from 'express';
import { getUsers } from '../controller/user';

const router = Router();

router.get('/', getUsers);

export { router };
