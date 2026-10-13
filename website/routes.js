// website/routes.js
import { Router } from 'express';
import * as api from './apis.js';
import * as controller from './controllers.js';
import { redirectIfAuthenticated, requireAuth } from '../configs/middlewares.js'; 

const router = Router();

router.get('/', controller.landing);
router.get('/about', controller.about);
router.get('/contact', controller.contact);
router.get('/spaces', controller.spaces);
router.get('/sign-in', controller.signIn);
router.post('/sign-in', controller.ingresar);
router.get('/recover-password', controller.recuperar_contraseña);
router.get('/sign-up', controller.signUp);
router.post('/sign-up/student', controller.signUp_student)
router.post('/sign-up/staff', controller.signUp_staff)
router.get('/cuenta-creada', controller.cuenta_creada);
router.get('/sign-out', requireAuth, controller.logout);
router.get('/api/v1/sessions', api.sessionInfo);


export default router;