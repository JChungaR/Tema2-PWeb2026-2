// website/routes.js
import { Router } from 'express';
import * as api from './apis.js';
import * as controller from './controllers.js';
import { redirectIfAuthenticated, requireAuth, redirectIfLogin } from '../configs/middlewares.js'; 

const router = Router();

router.get('/', redirectIfLogin, controller.landing);
router.get('/spaces', redirectIfLogin, controller.spaces);
router.get('/reglas', redirectIfLogin, controller.reglas);
router.get('/ayuda', redirectIfLogin, controller.ayuda);
router.get('/sign-in', redirectIfLogin, controller.signIn);
router.post('/sign-in', redirectIfLogin, controller.ingresar);
router.get('/recover-password', redirectIfLogin, controller.recuperar_contraseña);
router.get('/sign-up', redirectIfLogin, controller.signUp);
router.post('/sign-up/student', redirectIfLogin, controller.signUp_student)
router.post('/sign-up/staff', redirectIfLogin, controller.signUp_staff)
router.get('/cuenta-creada', redirectIfLogin, controller.cuenta_creada);
router.get('/logout', controller.logout);
router.get('/api/v1/sessions', api.sessionInfo);


export default router;