import { request, response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { disableUserAccount, getAllUsers, getUserData, saveUser, updateUser } from '../controllers/usuarios.controllers';


const router = Router();
router.post('/usuarios/', getAllUsers);
router.post('/usuarios/save/', saveUser);
router.post('/usuarios/get/', getUserData);
router.post('/usuarios/update/', updateUser);
router.post('/usuarios/disable/', disableUserAccount);

export default router;  