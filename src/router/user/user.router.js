import { Router } from 'express';
const router = Router()
// import { verifyToken } from '../../middleware/verifytoken.middleware.js';
import * as userController from '../../controllers/user.controller.js'
import * as validateUser from '../../validations/user.validation.js'
import valHelper from '../../helpers/validationHelper.js'

router.get('/get', userController.getUser);
router.post('/add', validateUser.validateAddUser, valHelper, userController.addUser);
router.put('/update', validateUser.validateUpdateUser, valHelper, userController.updateUser);
router.delete('/delete', validateUser.validateDeleteUser, valHelper, userController.deleteUser);

export default router