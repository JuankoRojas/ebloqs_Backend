import { request, response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { disableUserAccount, getAllUsers, getUserData, saveUser, updateUser, uploadDocument } from '../controllers/usuarios.controllers';
import { storageFiles } from '../libs/uploadsImgs';
import multer from 'multer';

const router = Router();
const upload = multer({storage:storageFiles}) 

router.post('/usuarios/', getAllUsers);
router.post('/usuarios/save/', saveUser);
router.post('/usuarios/get/', getUserData);
router.post('/usuarios/update/', updateUser);
router.post('/usuarios/disable/', disableUserAccount);
router.post('/usuarios/documento', upload.any(), uploadDocument);

export default router;  