import { Router } from "express"
import createUser from './../controllers/post.controller.js';
import { getUsers } from './../controllers/get.controller.js';
import { patchUser } from './../controllers/patch.controller.js';
import { deleteUser } from './../controllers/delete.controller.js';

const router = Router()

router.post('/create-user', createUser)
router.get('/', getUsers)
router.patch('/patch-user', patchUser)
router.delete('/delete-user', deleteUser)

export default router;